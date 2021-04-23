import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const createComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send(`Id ${id} is invalid.`);
  }
  const comment = new Comment(req.body);
  comment.userId = req.userId;
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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send(`Id ${id} is invalid.`);
  }
  Post.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "quotedCommentId",
      },
    })
    .then(
      (post) => {
        console.log(post.comments.length);
        res.status(200).json(post.comments);
      },
      (err) => {
        res.status(500).json({ message: err.message });
      }
    );
};
