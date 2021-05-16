import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";
import Post from "../models/post.js";
// GET search/user
export const getAllUsers = async (req, res) => {
  // auth
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const listUser = await User.find({});
    res.status(200).json(listUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET search/user
export const getSearchUsers = async (req, res) => {
  // auth
  let { q } = req.query ?? "";
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  if (!q) return res.status(200).json([]);
  try {
    const currentUser = await (
      await User.find({})
    ).filter((user) => user.name.includes(q));
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET search/post
export const getSearchPosts = async (req, res) => {
  // auth
  let { q } = req.query ?? "";
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  if (!q) return res.status(200).json([]);
  try {
    const posts = await (
      await Post.find({})
    ).filter((post) => post?.title?.includes(q));
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
