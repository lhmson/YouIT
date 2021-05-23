import express from "express";
import {
  changePassword,
  checkPassword,
  signin,
  signup,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/password/change", auth, changePassword);
router.get("/password/check", auth, checkPassword);

export default router;
