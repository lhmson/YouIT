import express from "express";

import {
  editComment,
  deleteComment,
  getMyCommentInteractions,
  unvoteComment,
  upvoteComment,
  downvoteComment,
} from "../controllers/comment.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id/myInteractions/", auth, getMyCommentInteractions);

router.put("/:id", auth, editComment);
router.put("/:id/unvote", auth, unvoteComment);
router.put("/:id/upvote", auth, upvoteComment);
router.put("/:id/downvote", auth, downvoteComment);

router.delete("/:id", auth, deleteComment);

export default router;
