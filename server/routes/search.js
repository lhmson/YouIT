import express from "express";
import { getAllUser, getSearchUser } from "../controllers/search_user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/user/:nameUser", auth, getSearchUser);

export default router;
