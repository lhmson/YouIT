import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const createComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await Post.findById(id)
    .then((post) => {
      post.comments.push(req.body);
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
  await Post.findById(id)
    .then((post) => {
      res.status(201).json(post.comments);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
