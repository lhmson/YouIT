import express from "express";
import mongoose from "mongoose";
import {
  addInteraction,
  getInteractionOfAUser,
  removeInteraction,
} from "../businessLogics/post.js";

import Post from "../models/post.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import { sendNotificationUser } from "../businessLogics/notification.js";
import User from "../models/user.js";
import Group from "../models/group.js";

//#region CRUD
// GET post/list/all
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(httpStatusCodes.ok).json(posts);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// GET post/:id

export const getAPost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findById(id)
      .populate("userId", "name") // need to populate more item (avatar, )
      .then((post) => {
        return res.status(200).json(post);
      })
      .catch((err) => {
        return res.status(404).json(`Cannot find a post with id: ${id}`);
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const createPost = async (req, res) => {
  const post = req.body;

  // new post shouldn't have an _id in it
  if (post._id) {
    return res.status(400).json("New post mustn't have _id field");
  }

  // handle post in group
  if (post.privacy === "Group") {
    const { groupId } = post;

    if (!groupId)
      return res.status(httpStatusCodes.badContent).json({ message: `Field groupId is required when privacy is "Group"` })

    const group = await Group.findById(groupId);
    if (!group)
      return res.status(httpStatusCodes.notFound).json({ message: `Cannot find group with group ID = ${groupId}` });

    post.groupPostInfo = {
      groupId,
    }
  }
  delete post.groupId;


  const newPost = new Post({
    ...post,
    userId: req.userId,
  });


  try {
    await newPost.save();
    return res.status(httpStatusCodes.created).json(newPost);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// PUT post/:id
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const newPost = req.body;

    if (!newPost)
      return res
        .status(httpStatusCodes.badContent)
        .send(`New post information is required`);

    const post = await (await Post.findById(id)).toObject();
    if (!post)
      return res
        .status(httpStatusCodes.notFound)
        .send(`Cannot find a post with id: ${id}`);

    if (!userId || !post.userId.equals(userId)) {
      return res.status(httpStatusCodes.unauthorized).json({ message: `You don't have permission to edit this post` });
    }

    const updatedPost = {
      ...newPost,
      _id: id,
    };

    console.log("update post", updatedPost);

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    return res.status(httpStatusCodes.ok).json(updatedPost);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// DELETE post/:id
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    // auth
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    const post = await (await Post.findById(id)).toObject();
    if (!post) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`No post with id: ${id}`);
    }

    if (!userId || !post.userId.equals(userId)) {
      return res.status(httpStatusCodes.unauthorized).json({ message: `You don't have permission to delete this post` });
    }

    await Post.findByIdAndRemove(id);
    res
      .status(httpStatusCodes.ok)
      .json({ message: "Post deleted successfully." });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////

//#region post interactions
export const getMyPostInteractions = async (req, res) => {
  const { id } = req.params;
  const { filter } = req.query;

  try {
    // auth
    const { userId } = req;
    if (!userId) {
      return res.json({ message: "Unauthenticated" });
    }

    let filterJson = undefined;
    try {
      filterJson = JSON.parse(filter);
    } catch { }

    const interactions = await getInteractionOfAUser(id, userId, filterJson);
    return res.status(httpStatusCodes.ok).json(interactions);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// currying function for different type of adding interaction, such as: upvote, downvote, follow, hide
/**
 * @param {[{actionType: "add"|"remove", interactionType: "upvote"|"downvote"|"react"|"hide"|"follow"}]} actions
 */
const handleUpdateInteraction = (actions) => async (req, res) => {
  const { id } = req.params;

  try {
    // auth
    const { userId } = req;
    if (!userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(httpStatusCodes.badContent)
        .send(`post id ${id} is invalid`);

    // user who act
    const user = await User.findById(userId);
    // console.log(user);

    const post = await Post.findById(id);
    if (!post)
      return res
        .status(httpStatusCodes.notFound)
        .json(`Cannot find a post with id: ${id}`);

    let newPost = { ...post.toObject() };

    actions.forEach((a) => {
      switch (a.actionType) {
        case "add":
          newPost = addInteraction(newPost, userId, a.interactionType);

          // Test socket.io
          if (a.interactionType === "upvote") {
            // cuteIO.sendToUser(
            //   newPost.userId.toString(),
            //   "UpvotePost_PostOwner",
            //   { upvoter: userId, post: newPost }
            // );
            sendNotificationUser({
              userId: newPost.userId.toString(),
              kind: "UpvotePost_PostOwner",
              content: {
                description: `${user?.name} has upvoted your post named ${newPost?.title}`,
              },
              link: `/post/${newPost._id}`,
            });
          }

          break;
        case "remove":
          newPost = removeInteraction(newPost, userId, a.interactionType);
          break;
      }
    });

    newPost = await Post.findByIdAndUpdate(id, newPost, { new: true });
    return res.status(httpStatusCodes.ok).json(newPost);
  } catch (error) {
    // return res.status(httpStatusCodes.internalServerError).json({ message: error.message });
    throw error;
  }
};

export const unvotePost = handleUpdateInteraction([
  { actionType: "remove", interactionType: "upvote" },
  { actionType: "remove", interactionType: "downvote" },
]);

export const upvotePost = handleUpdateInteraction([
  { actionType: "remove", interactionType: "downvote" },
  { actionType: "add", interactionType: "upvote" },
]);

export const downvotePost = handleUpdateInteraction([
  { actionType: "remove", interactionType: "upvote" },
  { actionType: "add", interactionType: "downvote" },
]);

export const hidePost = handleUpdateInteraction([
  { actionType: "add", interactionType: "hide" },
]);

export const unhidePost = handleUpdateInteraction([
  { actionType: "remove", interactionType: "hide" },
]);

export const followPost = handleUpdateInteraction([
  { actionType: "add", interactionType: "follow" },
]);

export const unfollowPost = handleUpdateInteraction([
  { actionType: "remove", interactionType: "follow" },
]);
//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////

export const getPostsPagination = async (req, res) => {
  //get _page and _limit params from url
  let { _page, _limit } = req.query;
  _page = parseInt(_page);
  _limit = parseInt(_limit);
  try {
    await Post.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .skip(_page > 0 ? _page * _limit : 0)
      .limit(_limit)

      .then((posts) => {
        return res.status(200).json(posts);
      })
      .catch((err) => {
        return res.status(500).json(`Cannot get posts`);
      });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getOtherPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const excludedPost = await Post.findById(id);
    if (!excludedPost) {
      res.status(404).json("Invalid ID");
      return;
    }
    const posts = await (await Post.find())
      .filter(
        (p) =>
          p.userId?.toString() === excludedPost?.userId.toString() &&
          p._id.toString() !== excludedPost._id.toString()
      )
      .slice(0, 5);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @deprecated
 */
export const likePost = async (req, res) => {
  const { id } = req.params;

  // auth
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await Post.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
