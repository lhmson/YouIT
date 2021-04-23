import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const createComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const comment = new Comment(req.body);
  await comment.save();
  await Post.findById(id)
    .then((post) => {
      post.comments.push(comment._id);
      post.save();
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

export const getComments = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  (await Post.findById(id))
    .populate({
      path: "comments",
      populate: {
        path: "quotedCommentId",
      },
    })
    .execPopulate(function (err, post) {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json(post.comments);
    });
};
