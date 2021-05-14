import express from "express";
import {
  addFriend,
  addReceivingFriendRequest,
  addSendingFriendRequest,
  getUserInfo,
  removeReceivingFriendRequest,
  removeSendingFriendRequest,
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

export default router;
