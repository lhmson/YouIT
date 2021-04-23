import express from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  upvotePost,
  downvotePost,
  unvotePost,
} from "../controllers/posts_CuteTN.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/all", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.put("/:id/unvote", auth, unvotePost);
router.put("/:id/upvote", auth, unvotePost, upvotePost);
router.put("/:id/downvote", auth, unvotePost, downvotePost);

export default router;
