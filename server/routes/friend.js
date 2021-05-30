import express from "express";
import {
  getListFriends,
  getNumberofFriends,
  getListMutualFriends,
  getNumberMutualFriends,
  getListRequestFriends,
} from "../controllers/friend.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id/listFriends", auth, getListFriends);
router.get("/:id/countFriends", auth, getNumberofFriends);
router.get("/listMutualFriends/:userId1/:userId2", auth, getListMutualFriends);
router.get(
  "/countMutualFriends/:userId1/:userId2",
  auth,
  getNumberMutualFriends
);
router.get("/:userId/listRequestFriends", auth, getListRequestFriends);

export default router;
