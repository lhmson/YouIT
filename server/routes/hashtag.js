import express from "express";
import {
  createHashtag,
  getAHashtag,
  getAllHashtags,
} from "../controllers/hashtag.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/all", auth, getAllHashtags);
router.get("/:id", auth, getAHashtag);

router.post("/", auth, createHashtag);

// router.delete("/:id", auth, deleteFriendRequest);

export default router;
