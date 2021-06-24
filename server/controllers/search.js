import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";
import Post from "../models/post.js";
import Group from "../models/group.js";
import { isPostVisibleByUser } from "../businessLogics/post.js";
import { asyncFilter } from "../utils/asyncFilter.js";
import { extractToken } from "../businessLogics/auth.js";

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
    ).filter((user) => user?.name?.toLowerCase().includes(q.toLowerCase()));
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isHagtagsInclude = (hashtags, nameTag) => {
  if (!nameTag) return false;
  for (let i = 0; i < hashtags.length; i++)
    if (hashtags[i]?.name === nameTag) {
      // console.log(hashtags[i].name);
      return true;
    }
  return false;
};

// GET search/post
export const getSearchPosts = async (req, res) => {
  // auth
  let { q } = req.query ?? "";

  const token = req.headers.authorization?.split(" ")?.[1];
  const userId = token ? extractToken(token).userId : null;

  if (!q) return res.status(200).json([]);
  try {
    const posts = await Post.find({})
      .populate("userId", "name avatarUrl")
      .populate({
        path: "groupPostInfo.groupId",
        select: "name",
        model: "Group",
      })
      .populate({
        path: `hashtags`,
        model: `Hashtag`,
        select: "name count",
      });
    asyncFilter(posts, async (post) => {
      // console.log("post", post);
      return (
        (await isPostVisibleByUser(post, userId)) &&
        (post?.title?.toLowerCase().includes(q.toLowerCase()) ||
          isHagtagsInclude(post?.hashtags, q))
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

// GET search/post
export const getSearchPostsByTag = async (req, res) => {
  // auth
  let { q } = req.query ?? "";

  const token = req.headers.authorization?.split(" ")?.[1];
  const userId = token ? extractToken(token).userId : null;

  if (!q) return res.status(200).json([]);
  try {
    const posts = await Post.find({})
      .populate("userId", "name avatarUrl")
      .populate({
        path: "groupPostInfo.groupId",
        select: "name",
        model: "Group",
      })
      .populate({
        path: `hashtags`,
        model: `Hashtag`,
        select: "name count",
      });
    asyncFilter(posts, async (post) => {
      // console.log("post", post);
      return (
        (await isPostVisibleByUser(post, userId)) &&
        isHagtagsInclude(post?.hashtags, q)
      );
    }).then((data) => {
      if (data.length > 3) {
        let resPost = [];
        for (let i = 0; i < 3; i++) resPost.push(data[i]);
        return res.status(200).json(resPost);
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
