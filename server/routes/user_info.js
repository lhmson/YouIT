import express from "express";
import {
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
router.put("/:id/receiveFriendRequest/add", addReceivingFriendRequest);
router.put("/:id/sendFriendRequest/add", addSendingFriendRequest);
router.put("/:id/receiveFriendRequest/remove", removeReceivingFriendRequest);
router.put("/:id/sendFriendRequest/remove", removeSendingFriendRequest);

export default router;
