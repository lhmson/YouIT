import express from "express";
import {
  getAGroup,
  createGroup,
  deleteGroup,
  addGroupMember,
  getJoinedGroups,
  addGroupPendingMember,
  removeGroupPendingMember,
} from "../controllers/group.js";
import auth from "../middleware/auth.js";
import { haveGroupPermission, isOwner } from "../middleware/groupRole.js";
const router = express.Router();

router.get("/:id", auth, getAGroup);
router.get("/list/joinedByMe", auth, getJoinedGroups);

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

router.delete("/:id", auth, isOwner, deleteGroup);

export default router;
