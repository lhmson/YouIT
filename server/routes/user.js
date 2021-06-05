import express from "express";
import {
  changePassword,
  checkPassword,
  resendVerificationMail,
  signin,
  signup,
  verifyToken,
  signout,
  getFriendsStatus,
  setUserStatus,
  getUserStatus,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/password/change", auth, changePassword);
router.get("/password/check/:password", auth, checkPassword);
router.put("/verify/:token", verifyToken);
router.post("/resend", resendVerificationMail);
router.post("/signout", signout);

// user status APIs
router.get("/list/friendsStatus", auth, getFriendsStatus);
router.get("/getStatus", auth, getUserStatus);
router.put("/setStatus/:newStatus", auth, setUserStatus);

export default router;
