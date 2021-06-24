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
  getPendingGroups,
  inviteFriends,
  setGroupMemberRole,
  updateGroup,
  countGroups,
  countPostsOfGroup,
  getAllGroupsForReport,
} from "../controllers/group.js";
import auth from "../middleware/auth.js";
import { haveGroupPermission, isOwner } from "../middleware/groupRole.js";
const router = express.Router();

// co group id thi route phai /:groupId moi xai dc middleware phan quyen nha, /:id khong xai dc
router.get("/reports", auth, getAllGroupsForReport);
router.get("/:groupId", auth, getAGroup);
router.get("/list/joinedByMe", auth, getJoinedGroups);
router.get("/:groupId/members", auth, getListMembers);
router.get("/:groupId/pendingMembers", auth, getListPendingMembers);
router.get("/list/pendingByMe", auth, getPendingGroups);
router.get("/count/:range/:timeString", countGroups);
router.get("/:groupId/posts/count/all", auth, countPostsOfGroup);

router.post("/", auth, createGroup);
router.post("/:groupId/inviteToGroup", auth, inviteFriends);

// chua phan quyen, cho xai thu cai cua Nghia
router.put("/", auth, updateGroup);
router.put(
  "/:groupId/addGroupMember/:memberId",
  auth,
  haveGroupPermission("Admin"),
  addGroupMember
);
router.put("/:groupId/addPendingMember/:memberId", auth, addGroupPendingMember);
router.put(
  "/:groupId/removePendingMember/:memberId",
  auth,
  removeGroupPendingMember
);
router.put("/:groupId/deleteMember/:deletedUserId", auth, deleteMember);
router.put("/:groupId/leaveGroup/:userId", auth, leaveGroup);
router.put(
  "/:groupId/setMemberRole/:memberId",
  auth,
  haveGroupPermission("Admin"),
  setGroupMemberRole
);

// router.delete("/:id", auth, isOwner, deleteGroup); // chỗ này để id vì isOwner của Sanh để id
router.delete("/:id", auth, deleteGroup);

export default router;
