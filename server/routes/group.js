import express from "express";
import { getAGroup } from "../controllers/group.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/:id", auth, getAGroup);

export default router;
