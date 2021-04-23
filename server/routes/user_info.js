import express from "express";
import { getUserInfo } from "../controllers/user_info";

const router = express.Router();

router.post("/userinfo", getUserInfo);

export default router;
