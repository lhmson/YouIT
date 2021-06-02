import express from "express";
import {
  createFriendRequest,
  deleteFriendRequest,
  getAFriendRequest,
  getAllFriendRequests,
  checkUserASendedRequestUserB,
} from "../controllers/friendRequest.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/all", auth, getAllFriendRequests);
router.get("/:id", auth, getAFriendRequest);
router.get(
  "/:userA/isSendedRequest/:userB",
  auth,
  checkUserASendedRequestUserB
);

router.post("/create", auth, createFriendRequest);
router.delete("/:id", auth, deleteFriendRequest);

export default router;
