import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

//#region CRUD
// GET post/list/all
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    // server error occurs
    res.status(500).json({ message: error.message });
  }
};

// GET post/:id
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json(`Cannot find a post with id: ${id}`);
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST post/
export const createPost = async (req, res) => {
  const post = req.body;

  // new post shouldn't have an _id in it
  if (post._id) {
    res.status(400).json("New post mustn't have _id field");
    return;
  }

  const newPost = new Post({
    ...post,
    userId: req.userId,
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT post/:id
export const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const newPost = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Cannot find a post with id: ${id}`);

    if (!newPost)
      return res.status(400).send(`New post information is required`);

    const updatedPost = {
      ...newPost,
      _id: id,
    };

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE post/:id
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    if (!(await Post.findById(id))) {
      return res.status(404).send(`No post with id: ${id}`);
    }
  } else
    return res.status(httpStatusCodes.badContent).send(`id ${id} is invalid`);

  await Post.findByIdAndRemove(id);
  res.status(200).json({ message: "Post deleted successfully." });
};
//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////

//#region post interactions

// currying function for different type of adding interaction, such as: upvote, downvote, follow, hide
// only work for list of user
const handleAddInteraction = (listInteractionName) => async (req, res) => {
  const { id } = req.params;

  // auth
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(httpStatusCodes.notFound).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const { interactionInfo } = post;
  const listInteraction = interactionInfo[listInteractionName];

  if (!listInteraction.find((u) => u === userId)) {
    listInteraction.push(userId);
  }
  post.save();

  // const updatedPost = await Post.findByIdAndUpdate(id, post, {
  //     new: true,
  // });

  // res.json(updatedPost);
};

// PUT post/:id/unvote
export const unvotePost = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    // auth
    if (!userId) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "Unauthenticated" });
    }

    const post = await Post.findById(id);
    if (!post)
      return res
        .status(httpStatusCodes.notFound)
        .send(`No post with id: ${id}`);

    const { interactionInfo } = post;
    const { listUpvotes, listDownvotes } = interactionInfo;
    listUpvotes = listUpvotes.filter((u) => u !== userId);
    listDownvotes = listDownvotes.filter((u) => u !== userId);
    post.save();

    if (next) {
      return next?.();
    } else {
      res.status(httpStatusCodes.ok);
    }
  } catch (error) {}
};

// PUT post/:id/upvote
export const upvotePost = handleAddInteraction("listUpvotes");

export const downvotePost = async (req, res) => {
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
//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////

export const getPostsPagination = async (req, res) => {
  //get _page and _limit params from url
  let { _page, _limit } = req.query;
  _page = parseInt(_page);
  _limit = parseInt(_limit);
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(_page > 0 ? _page * _limit : 0)
      .limit(_limit);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getAPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOtherPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const excludedPost = await Post.findById(id);
    if (!excludedPost) {
      res.status(404).json({ message: error.message });
      return;
    }
    const posts = await (await Post.find())
      .filter(
        (p) =>
          p.creatorId.equals(excludedPost.creatorId) &&
          !p._id.equals(excludedPost._id)
      )
      .slice(0, 5);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
