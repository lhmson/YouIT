import express from "express";

import { editComment, deleteComment } from "../controllers/comment.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.put("/:id", auth, editComment);

router.delete("/:id", auth, deleteComment);

export default router;
