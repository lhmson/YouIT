import express from "express";
import {
  getAGroup,
  createGroup,
  deleteGroup,
  addGroupMember,
  getJoinedGroups,
  addGroupPendingMember,
  removeGroupPendingMember,
  getListMembers,
  getListPendingMembers,
  deleteMember,
  leaveGroup,
  countGroups,
} from "../controllers/group.js";
import auth from "../middleware/auth.js";
import { haveGroupPermission, isOwner } from "../middleware/groupRole.js";
const router = express.Router();

router.get("/:id", auth, getAGroup);
router.get("/list/joinedByMe", auth, getJoinedGroups);
router.get("/:id/members", auth, getListMembers);
router.get("/:id/pendingMembers", auth, getListPendingMembers);
router.get("/count/:range/:timeString", countGroups);

router.post("/", auth, createGroup);

router.put(
  "/:id/addMember/:memberId",
  auth,
  haveGroupPermission("Admin"),
  addGroupMember
);
router.put("/:id/addPendingMember/:memberId", auth, addGroupPendingMember);
router.put(
  "/:id/removePendingMember/:memberId",
  auth,
  removeGroupPendingMember
);
router.put("/:id/deleteMember/:deletedUserId", auth, isOwner, deleteMember);
router.put("/:id/leaveGroup", auth, leaveGroup);

router.delete("/:id", auth, isOwner, deleteGroup);

export default router;
