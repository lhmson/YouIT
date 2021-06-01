import express from "express";
import {
  addFriend,
  addReceivingFriendRequest,
  addSendingFriendRequest,
  followUser,
  getUserInfo,
  removeReceivingFriendRequest,
  removeSendingFriendRequest,
  unfriend,
  updateUserInfo,
} from "../controllers/user_info.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", getUserInfo);

router.put("/:id", auth, updateUserInfo);
router.put("/:id/receiveFriendRequest/add", auth, addReceivingFriendRequest);
router.put("/:id/sendFriendRequest/add", auth, addSendingFriendRequest);
router.put(
  "/:id/receiveFriendRequest/remove",
  auth,
  removeReceivingFriendRequest
);
router.put("/:id/sendFriendRequest/remove", auth, removeSendingFriendRequest);
router.put("/:id/addfriend", auth, addFriend);
router.put("/:id/unfriend/:friendId", auth, unfriend);
router.put("/:id/follow/:followedId", auth, followUser);

export default router;
