import express from "express";
import {
  createHashtag,
  deleteHashtag,
  getAHashtag,
  getAllHashtags,
} from "../controllers/hashtag.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/all", auth, getAllHashtags);
router.get("/:id", auth, getAHashtag);

router.post("/", auth, createHashtag);

router.delete("/:hashtagId", auth, deleteHashtag);

export default router;
