import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getAPost,
  getOtherPosts,
} from "../controllers/posts.js";

import { createComment } from "../controllers/comments.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id/", getAPost);
router.get("/:id/others", getOtherPosts);

router.post("/", auth, createPost);
router.post("/:id/comments", createComment);

router.put("/:id", auth, updatePost);
router.put("/:id/likePost", auth, likePost);

router.delete("/:id", auth, deletePost);

export default router;
