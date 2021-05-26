import express from "express";
import {
  changePassword,
  checkPassword,
  resendVerificationMail,
  signin,
  signup,
  verifyToken,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/password/change", auth, changePassword);
router.get("/password/check/:password", auth, checkPassword);
router.put("/verify/:token", verifyToken);
router.post("/resend", resendVerificationMail);

export default router;
