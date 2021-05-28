import express from "express";
import { addGroupPendingMember } from "../controllers/groupPendingMember.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addGroupPendingMember);

export default router;
