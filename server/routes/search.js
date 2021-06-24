import express from "express";
import {
  getSearchUsers,
  getSearchPosts,
  getSearchGroups,
  getSearchPostsByTag,
} from "../controllers/search.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/user", auth, getSearchUsers);
router.get("/post", getSearchPosts);
router.get("/postByTag", getSearchPostsByTag);
router.get("/group", auth, getSearchGroups);

export default router;
