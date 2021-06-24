import express from "express";
import mongoose from "mongoose";
import { sendNotificationUser } from "../businessLogics/notification.js";
import User from "../models/user.js";
import FriendRequest from "../models/friendrequest.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import { getRelationship } from "../businessLogics/user.js";
import Hashtag from "../models/hashtag.js";

// GET userinfo/:id
export const getUserInfo = async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res
      .status(httpStatusCodes.notFound)
      .json(`Cannot find user with id: ${id}`);
  }

  try {
    await User.findById(id).then((user) => {
      if (!user)
        return res
          .status(httpStatusCodes.notFound)
          .json(`Cannot find user with id: ${id}`);
      else {
        const userObj = user.toObject();
        delete userObj.password;
        return res.status(httpStatusCodes.ok).json(userObj);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT userinfo/
export const updateUserInfo = async (req, res) => {
  const { userId } = req;
  if (!userId) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const updatedUser = req.body;
    //const { userInfo } = updatedUser;
    if (!updatedUser)
      return res.status(400).send(`New user information is required`);

    await User.findByIdAndUpdate(userId, updatedUser);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// use for updating receiver
export const addReceivingFriendRequest = async (req, res) => {
  const friendRequest = req.body;
  //console.log(friendRequest);
  try {
    // update receiver
    await User.findById(friendRequest.userConfirmId).then(async (user) => {
      if (!user.listReceivingFriendRequests.includes(friendRequest._id)) {
        user.listReceivingFriendRequests.push(friendRequest._id);
        await user.save();
        res.status(httpStatusCodes.ok).json(user);
      } else {
        res.json({ message: "Friend request exists" });
      }
    });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const removeReceivingFriendRequest = async (req, res) => {
  const friendRequest = req.body;
  //console.log(friendRequest);
  try {
    // update receiver
    await User.findById(friendRequest.userConfirmId).then(async (user) => {
      user.listReceivingFriendRequests =
        user.listReceivingFriendRequests.filter(
          (item) => item != friendRequest._id
        );
      await user.save();
      res.status(httpStatusCodes.ok).json(user);
    });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// use for updating sender
export const addSendingFriendRequest = async (req, res) => {
  const friendRequest = req.body;

  try {
    // update sender
    await User.findById(friendRequest.userSendRequestId).then(async (user) => {
      if (!user.listSendingFriendRequests.includes(friendRequest._id)) {
        user.listSendingFriendRequests.push(friendRequest._id);
        await user.save();
        res.status(httpStatusCodes.ok).json(user);
      } else {
        res.json({ message: "Friend request exists" });
      }
    });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const removeSendingFriendRequest = async (req, res) => {
  const friendRequest = req.body;
  try {
    // update receiver
    await User.findById(friendRequest.userSendRequestId).then(async (user) => {
      user.listSendingFriendRequests = user.listSendingFriendRequests.filter(
        // item is object
        // friendRequest._id is string
        // type different => can't use !==
        (item) => item != friendRequest._id
      );
      await user.save();
      res.status(httpStatusCodes.ok).json(user);
    });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// PUT userinfo/:id/addfriend
/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const addFriend = async (req, res) => {
  const friendRequest = req.body;
  const { userId } = req;

  if (!userId)
    return res
      .status(httpStatusCodes.unauthorized)
      .json({ message: "Unauthorized" });

  // if (!(await FriendRequest.findById(friendRequest?._id)))
  //   return res
  //     .status(httpStatusCodes.notFound)
  //     .json({ message: "Request not found" });

  try {
    // await has an effect =.=
    const relationship = await getRelationship(
      friendRequest?.userConfirmId,
      friendRequest?.userSendRequestId
    );
    // console.log(relationship);
    if (relationship == "Friend")
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "Have already been friend" });

    // add friendId to user's list friends
    const acceptingUser = await User.findById(userId);
    acceptingUser.listFriends.push(friendRequest?.userSendRequestId);
    await acceptingUser.save();

    // add userId to friend's list friends
    const acceptedUser = await User.findById(friendRequest?.userSendRequestId);

    if (!acceptedUser)
      return res
        .status(httpStatusCodes.notFound)
        .send("User sending friend request is not found");

    acceptedUser.listFriends.push(userId);
    await acceptedUser.save();

    // notification
    sendNotificationUser({
      userId: friendRequest?.userSendRequestId,
      content: {
        description: `${acceptingUser.name} accepted your friend request!`,
      },
      link: `/userinfo/${acceptingUser._id}`,
      kind: "AcceptFriend_AcceptedFriend",
    });

    const acceptedUserObj = acceptedUser.toObject();
    delete acceptedUserObj.password;

    return res.status(httpStatusCodes.ok).json(acceptedUserObj);
  } catch (error) {
    console.log(error);
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const unfriend = async (req, res) => {
  const { friendId } = req.params;
  const { userId } = req;

  if (!userId)
    return res
      .status(httpStatusCodes.unauthorized)
      .json({ message: "Unauthorized" });

  try {
    // remove friend from user's list friends
    await User.findById(userId).then(async (user) => {
      user.listFriends = user.listFriends.filter((id) => id != friendId);
      await user.save();
    });

    // remove user from friend's list friends
    await User.findById(friendId).then(async (friend) => {
      friend.listFriends = friend.listFriends.filter((id) => id != userId);
      await friend.save();
      res.status(httpStatusCodes.ok).json(friend);
    });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const followUser = async (req, res) => {
  const { followedId } = req.params;
  const { userId } = req;

  if (!userId)
    return res
      .status(httpStatusCodes.unauthorized)
      .json({ message: "Unauthorized" });

  try {
    await User.findById(followedId)
      .then(async (user) => {
        if (user.listFriendFollows.includes(userId))
          return res
            .status(httpStatusCodes.badContent)
            .json({ message: "Followed this user" });

        user.listFriendFollows.push(userId);
        await user.save();
        res.status(httpStatusCodes.ok).json(user);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const unfollowUser = async (req, res) => {
  const { followedId } = req.params;
  const { userId } = req;
  // dang lam
  if (!userId)
    return res
      .status(httpStatusCodes.unauthorized)
      .json({ message: "Unauthorized" });

  try {
    await User.findById(followedId)
      .then(async (user) => {
        if (user.listFriendFollows.includes(userId)) {
          user.listFriendFollows = user.listFriendFollows.filter(
            (followingId) => followingId != userId
          );
          await user.save();
          res.status(httpStatusCodes.ok).json(user);
        } else {
          res
            .status(httpStatusCodes.notFound)
            .json("You have not followed this user");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const addProgrammingHashtag = async (req, res) => {
  const { hashtagId } = req.params;
  const { userId } = req;

  if (!userId)
    return res
      .status(httpStatusCodes.unauthorized)
      .json({ message: "Unauthorized" });

  try {
    const hashtag = await Hashtag.findById(hashtagId);

    if (!hashtag)
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "Hashtag not found" });

    await User.findById(userId).then(async (user) => {
      if (user.userInfo.programmingHashtags.includes(hashtagId))
        return res
          .status(httpStatusCodes.badContent)
          .json({ message: "This hashtag has already been added" });

      user.userInfo.programmingHashtags.push(hashtagId);
      await user.save();
      return res.status(httpStatusCodes.ok).json(user);
    });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const removeProgrammingHashtag = async (req, res) => {
  const { hashtagId } = req.params;
  const { userId } = req;

  if (!userId)
    return res
      .status(httpStatusCodes.unauthorized)
      .json({ message: "Unauthorized" });

  try {
    const hashtag = await Hashtag.findById(hashtagId);

    if (!hashtag)
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "Hashtag not found" });

    await User.findById(userId).then(async (user) => {
      if (!user.userInfo.programmingHashtags.includes(hashtagId))
        return res
          .status(httpStatusCodes.badContent)
          .json({ message: "This hashtag has not been added" });

      user.userInfo.programmingHashtags =
        user.userInfo.programmingHashtags.filter(
          (hashtag) => hashtag?._id != hashtagId
        );
      await user.save();
      return res.status(httpStatusCodes.ok).json(user);
    });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const editImage = async (req, res) => {
  const image = req.body;
  const { userId } = req;

  if (!userId) return res.json({ message: "Unauthorized" });

  try {
    const user = await User.findById(userId);

    if (!user)
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "User not found" });

    user[image?.type] = image?.base64;
    await user.save();
    return res.status(httpStatusCodes.ok).json(user[image?.type]);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
