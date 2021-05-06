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
  editComment,
  deleteComment,
  replyComment,
} from "../controllers/comment.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// router.get("/", getPosts);
router.get("/", getPostsPagination);
// router.get("/", getPosts);
router.get("/:id", getAPost);
router.get("/:id/others", getOtherPosts);
router.get("/:id/comment", getComments);
router.get("/list/all", getPosts);
router.get("/:id/myInteractions/", auth, getMyPostInteractions);

router.post("/", auth, createPost);
router.post("/:id/comment", auth, createComment);
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
router.put("/:id/comment/:commentId", auth, editComment);

router.delete("/:id", auth, deletePost);
router.delete("/:id/comment/:commentId", auth, deleteComment);

export default router;
