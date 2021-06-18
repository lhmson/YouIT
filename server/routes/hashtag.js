import express from "express";
import {
  createHashtag,
  deleteHashtag,
  getAHashtag,
  getAllHashtags,
  getUserProgrammingHashtags,
} from "../controllers/hashtag.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/all", getAllHashtags);
router.get("/:id", getAHashtag);
router.get("/:userId/programmingHashtags", auth, getUserProgrammingHashtags);

router.post("/", auth, createHashtag);

router.delete("/:hashtagId", auth, deleteHashtag);

export default router;
