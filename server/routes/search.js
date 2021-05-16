import express from "express";
import {
  getAllUsers,
  getSearchUsers,
  getSearchPosts,
} from "../controllers/search_user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/user", auth, getSearchUsers);
router.get("/post", auth, getSearchPosts);

export default router;
