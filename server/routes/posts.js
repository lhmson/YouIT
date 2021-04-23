import express from "express";

import {
  // getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsPagination,
  getAPost,
  getOtherPosts,
} from "../controllers/posts.js";

import { createComment, getComments } from "../controllers/comments.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// router.get("/", getPosts);
router.get("/", getPostsPagination);
// router.get("/", getPosts);
router.get("/:id", getAPost);
router.get("/:id/others", getOtherPosts);
router.get("/:id/comments", getComments);

router.post("/", auth, createPost);
router.post("/:id/comments", auth, createComment);

router.put("/:id", auth, updatePost);
router.put("/:id/likePost", auth, likePost);

router.delete("/:id", auth, deletePost);

export default router;
