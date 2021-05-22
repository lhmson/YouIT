import express from "express";
import { getListFriends, getNumberofFriends } from "../controllers/friend.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id/listFriends", auth, getListFriends);
router.get("/:id/countFriends", auth, getNumberofFriends);

export default router;
