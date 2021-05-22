import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsPagination,
  getAPost,
  getOtherPosts,
  upvotePost,
  downvotePost,
  unvotePost,
  getMyPostInteractions,
  hidePost,
  unhidePost,
  followPost,
  unfollowPost,
} from "../controllers/post.js";

import {
  createComment,
  getComments,
  replyComment,
} from "../controllers/comment.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// router.get("/", getPosts);
router.get("/", auth, getPostsPagination);
// router.get("/", getPosts);
router.get("/:id", auth, getAPost);
router.get("/:id/others", getOtherPosts);
router.get("/:id/comment", getComments);
router.get("/list/all", getPosts);
router.get("/:id/myInteractions/", auth, getMyPostInteractions);

router.post("/", auth, createPost);
router.post("/:postId/comment", auth, createComment);
router.post("/:postId/comment/:commentId", auth, replyComment);

router.put("/:id", auth, updatePost);
router.put("/:id/likePost", auth, likePost);
router.put("/:id/unvote", auth, unvotePost);
router.put("/:id/upvote", auth, upvotePost);
router.put("/:id/downvote", auth, downvotePost);
router.put("/:id/hide", auth, hidePost);
router.put("/:id/unhide", auth, unhidePost);
router.put("/:id/follow", auth, followPost);
router.put("/:id/unfollow", auth, unfollowPost);

router.delete("/:id", auth, deletePost);

export default router;
