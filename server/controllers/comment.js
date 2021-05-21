import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";
import Comment from "../models/comment.js";

import { httpStatusCodes } from "../utils/httpStatusCode.js";

export const createComment = async (req, res) => {
  const { postId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).send(`Id ${postId} is invalid.`);
  }
  const comment = new Comment(req.body);
  comment.userId = req.userId;
  await comment.save();
  try {
    await Post.findById(postId)
      .then(async (post) => {
        post.comments.push(comment._id);
        await post.save();
        res.status(201).json(post);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const replyComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { userId } = req;
  try {
    const comment = new Comment(req.body);
    comment.userId = userId;
    comment.quotedCommentId = commentId;
    if (!comment) return res.status(400).json({ message: err.message });
    await comment.save();

    await Post.findById(postId)
      .then(async (post) => {
        post.comments.push(comment._id);
        await post.save();
        res.status(201).json(comment);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  } catch (error) {}
};

export const getComments = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send(`Id ${id} is invalid.`);
  }
  Post.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "name",
      },
    })
    .populate({
      path: "comments",
      populate: {
        path: "quotedCommentId",
        populate: {
          path: "userId",
          select: "name",
        },
      },
    })
    .then(
      (post) => {
        // console.log(post.comments.length);
        post.comments.map((c) => {
          if (c.quotedCommentId === null) console.log("null quoted comment", c);
        });
        res.status(200).json(post.comments);
      },
      (err) => {
        res.status(500).json({ message: err.message });
      }
    );
};

export const editComment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    if (!userId) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "Unauthenticated" });
    }
    await Comment.findByIdAndUpdate(
      id,
      {
        content: req.body.content,
      },
      { new: true }
    )
      .then((comment) => {
        return res.status(200).json(comment);
      })
      .catch((err) => {
        return res.status(404).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    if (!userId) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "Unauthenticated" });
    }
    await Comment.findByIdAndDelete(id)
      .then((comment) => {
        return res.status(200).json(comment);
      })
      .catch((err) => {
        return res.status(404).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
