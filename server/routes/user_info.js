import express from "express";
import { getUserInfo, updateUserInfo } from "../controllers/user_info.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", getUserInfo);
router.put("/:id", auth, updateUserInfo);

export default router;
