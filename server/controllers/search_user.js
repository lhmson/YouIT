import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";
import Post from "../models/post.js";
import Group from "../models/group.js";

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

// GET search/group
export const getSearchGroups = async (req, res) => {
  // auth
  let { q } = req.query ?? "";
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  if (!q) return res.status(200).json([]);
  try {
    const groups = await (
      await Group.find({})
    ).filter((group) => group?.name?.includes(q));
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
