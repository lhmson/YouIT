import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
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
  canReviewGroupPost,
  approveGroupPost,
  declineGroupPost,
  countPosts,
} from "../controllers/post.js";

import {
  createComment,
  getComments,
  getCommentsNumber,
  replyComment,
} from "../controllers/comment.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// router.get("/", getPosts);
router.get("/", getPostsPagination);
router.get("/:id", getAPost);
router.get("/:id/others", getOtherPosts);
router.get("/:id/comment", getComments);
router.get("/:id/commentsNumber", getCommentsNumber);
router.get("/list/all", getPosts);
router.get("/:id/myInteractions/", auth, getMyPostInteractions);
router.get("/count/:range/:timeString", countPosts);

router.post("/", auth, createPost);
router.post("/:postId/comment", auth, createComment);
router.post("/:postId/comment/:commentId", auth, replyComment);

router.put("/:id", auth, updatePost);
router.put("/:id/unvote", auth, unvotePost);
router.put("/:id/upvote", auth, upvotePost);
router.put("/:id/downvote", auth, downvotePost);
router.put("/:id/hide", auth, hidePost);
router.put("/:id/unhide", auth, unhidePost);
router.put("/:id/follow", auth, followPost);
router.put("/:id/unfollow", auth, unfollowPost);
router.put(
  "/:postId/group/approve",
  auth,
  canReviewGroupPost,
  approveGroupPost
);

router.delete("/:id", auth, deletePost);
router.delete(
  "/:postId/group/decline",
  auth,
  canReviewGroupPost,
  declineGroupPost
);

export default router;
