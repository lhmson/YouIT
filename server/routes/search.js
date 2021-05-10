import express from "express";
import { getAllUser } from "../controllers/search_user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", auth, getAllUser);

export default router;
