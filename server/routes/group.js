import express from "express";
import {
  getAGroup,
  createGroup,
  deleteGroup,
  addGroupMember,
  getJoinedGroups,
  addGroupPendingMember,
  getPendingGroups,
} from "../controllers/group.js";
import auth from "../middleware/auth.js";
import { isOwner } from "../middleware/groupRole.js";
const router = express.Router();

router.get("/:id", auth, getAGroup);
router.get("/list/joinedByMe", auth, getJoinedGroups);
router.get("/list/pendingByMe", auth, getPendingGroups);

router.post("/", auth, createGroup);

router.put("/:id/addMember/:memberId", auth, addGroupMember);
router.put("/:id/addPendingMember/:memberId", auth, addGroupPendingMember);

router.delete("/:id", auth, isOwner, deleteGroup);

export default router;
