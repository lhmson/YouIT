import express from "express";

import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsPagination,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// router.get("/", getPosts);
router.get("/", getPostsPagination);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.put("/:id/likePost", auth, likePost);

export default router;
