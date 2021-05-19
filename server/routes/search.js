import express from "express";
import {
  getSearchUsers,
  getSearchPosts,
  getSearchGroups,
} from "../controllers/search_user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/user", auth, getSearchUsers);
router.get("/post", auth, getSearchPosts);
router.get("/group", auth, getSearchGroups);

export default router;
