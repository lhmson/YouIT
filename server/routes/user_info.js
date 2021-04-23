import express from "express";
import { getMyUserInfo } from "../controllers/user_info.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/my", auth, getMyUserInfo);

export default router;
