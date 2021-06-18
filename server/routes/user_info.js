import express from "express";
import {
  addFriend,
  addProgrammingHashtag,
  addReceivingFriendRequest,
  addSendingFriendRequest,
  editImage,
  followUser,
  getUserInfo,
  removeProgrammingHashtag,
  removeReceivingFriendRequest,
  removeSendingFriendRequest,
  unfollowUser,
  unfriend,
  updateUserInfo,
} from "../controllers/user_info.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", getUserInfo);

router.put("/", auth, updateUserInfo);
router.put("/:id/receiveFriendRequest/add", auth, addReceivingFriendRequest);
router.put("/:id/sendFriendRequest/add", auth, addSendingFriendRequest);
router.put(
  "/:id/receiveFriendRequest/remove",
  auth,
  removeReceivingFriendRequest
);
router.put("/:id/sendFriendRequest/remove", auth, removeSendingFriendRequest);
router.put("/addfriend", auth, addFriend);
router.put("/:id/unfriend/:friendId", auth, unfriend);
router.put("/:followedId/follow", auth, followUser);
router.put("/:followedId/unfollow", auth, unfollowUser);
router.put("/addProgrammingHashtag/:hashtagId", auth, addProgrammingHashtag);
router.put(
  "/removeProgrammingHashtag/:hashtagId",
  auth,
  removeProgrammingHashtag
);
router.put("/editImage", auth, editImage);

export default router;
