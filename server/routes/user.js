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
  checkAdminSystem,
  countNewUsers,
  redirectGithubCallback,
  signinWithGithub,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/newUsers/:range/:timeString", countNewUsers);
router.get("/password/check/:password", auth, checkPassword);
router.get("/login/github", signinWithGithub);
router.get("/login/github/callback", redirectGithubCallback);
router.get("/checkAdminSystem", auth, checkAdminSystem);

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/resend", resendVerificationMail);
router.post("/signout", signout);

router.put("/password/change", auth, changePassword);
router.put("/verify/:token", verifyToken);

// user status APIs
router.get("/list/friendsStatus", auth, getFriendsStatus);
router.get("/getStatus", auth, getUserStatus);
router.put("/setStatus/:newStatus", auth, setUserStatus);

export default router;
