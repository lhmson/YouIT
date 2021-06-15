import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";
import Post from "../models/post.js";
import Group from "../models/group.js";
import { isPostVisibleByUser } from "../businessLogics/post.js";
import { asyncFilter } from "../utils/asyncFilter.js";

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
    ).filter((user) => user.name.toLowerCase().includes(q.toLowerCase()));
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
    const posts = await Post.find({})
      .populate("userId", "name avatarUrl")
      .populate({
        path: "groupPostInfo.groupId",
        select: "name",
        model: "Group",
      });
    asyncFilter(posts, async (post) => {
      // console.log(post.title, await isPostVisibleByUser(post, req.userId));
      return (
        (await isPostVisibleByUser(post, req.userId)) &&
        post?.title?.toLowerCase().includes(q.toLowerCase())
      );
    }).then((data) => res.status(200).json(data));
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
    ).filter((group) => group?.name?.toLowerCase().includes(q.toLowerCase()));
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
