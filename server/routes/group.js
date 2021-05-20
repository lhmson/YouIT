import express from "express";
import {
  getAGroup,
  createGroup,
  deleteGroup,
  addGroupMember,
} from "../controllers/group.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/:id", auth, getAGroup);

router.post("/", auth, createGroup);

router.put("/:id/addMember/:memberId", auth, addGroupMember);

router.delete("/:id", auth, deleteGroup);

export default router;
