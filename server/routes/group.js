import express from "express";
import {
  getAGroup,
  createGroup,
  deleteGroup,
  addGroupMember,
  getJoinedGroups,
} from "../controllers/group.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/:id", auth, getAGroup);
router.get("/list/joinedByMe", auth, getJoinedGroups);

router.post("/", auth, createGroup);

router.put("/:id/addMember/:memberId", auth, addGroupMember);

router.delete("/:id", auth, deleteGroup);

export default router;
