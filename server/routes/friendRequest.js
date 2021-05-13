import express from "express";
import {
  createFriendRequest,
  deleteFriendRequest,
  getAFriendRequest,
} from "../controllers/friendRequest.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", auth, getAFriendRequest);
router.post("/create", auth, createFriendRequest);
router.delete("/:id", auth, deleteFriendRequest);

export default router;
