import express from "express";
import { getAGroup, createGroup } from "../controllers/group.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/:id", auth, getAGroup);

router.post("/", auth, createGroup);

export default router;
