import express from "express";
import FriendRequest from "../models/friendrequest.js";
import User from "../models/user.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import { sendNotificationUser } from "../businessLogics/notification.js";
import {
  haveMatchingFriendRequest,
  isUserA_sendedRequestFriend_UserB,
} from "../businessLogics/user.js";
/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const createFriendRequest = async (req, res) => {
  const friendRequest = req.body;

  // new request shouldn't have an _id in it
  if (friendRequest._id) {
    return res.status(400).json("New request mustn't have _id field");
  }

  try {
    const isMatchingFriendRequest = await haveMatchingFriendRequest(
      friendRequest?.userConfirmId,
      friendRequest?.userSendRequestId
    );

    if (isMatchingFriendRequest)
      return res
        .status(httpStatusCodes.forbidden)
        .json("Friend request between you and this user has been created.");

    // create new friend request
    const newFriendRequest = new FriendRequest(friendRequest);
    await newFriendRequest.save();

    const requestSender = await User.findById(friendRequest.userSendRequestId);
    const requestReceiver = await User.findById(friendRequest.userConfirmId);

    // Send notification to partner
    sendNotificationUser({
      userId: friendRequest.userConfirmId,
      kind: "FriendRequest_RequestReceiver",
      content: {
        description: `${requestSender?.name} has sent you a friend request`,
      },
      link: `/userinfo/${requestSender._id}`,
    });

    res.status(httpStatusCodes.created).json(newFriendRequest);
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
export const getAFriendRequest = async (req, res) => { };

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getAllFriendRequests = async (req, res) => {
  try {
    const friendRequests = await FriendRequest.find();
    return res.status(httpStatusCodes.ok).json(friendRequests);
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
export const deleteFriendRequest = async (req, res) => {
  const { id } = req.params;

  try {
    // auth
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!(await FriendRequest.findById(id))) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`No friend request with id: ${id}`);
    }

    await FriendRequest.findByIdAndRemove(id);
    res
      .status(httpStatusCodes.ok)
      .json({ message: "Friend request deleted successfully." });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const checkUserASendedRequestUserB = async (req, res) => {
  try {
    const { userA, userB } = req.params;
    const value = await isUserA_sendedRequestFriend_UserB(userA, userB);
    console.log("value", value);
    return res.status(httpStatusCodes.ok).json(value);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
