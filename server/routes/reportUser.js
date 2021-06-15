import express from "express";

import {
  createReportUser,
  getAllReportUserRequests,
  acceptReportUser,
  denyReportUser,
} from "../controllers/reportUser.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getAll", auth, getAllReportUserRequests);

router.post("/create", auth, createReportUser);

router.put("/:idReport/accept", auth, acceptReportUser);
router.put("/:idReport/deny", auth, denyReportUser);

export default router;
