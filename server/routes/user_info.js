import express from "express";
import { getMyUserInfo, updateUserInfo } from "../controllers/user_info.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/my", auth, getMyUserInfo);
router.put("/:id", auth, updateUserInfo);

export default router;
