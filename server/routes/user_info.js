import express from "express";
import {
  getUserInfo,
  updateListReceivingFriendRequests,
  updateListSendingFriendRequests,
  updateUserInfo,
} from "../controllers/user_info.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", getUserInfo);
router.put("/:id", auth, updateUserInfo);
router.put("/:id/receiveFriendRequest", updateListReceivingFriendRequests);
router.put("/:id/sendFriendRequest", updateListSendingFriendRequests);

export default router;
