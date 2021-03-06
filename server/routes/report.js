import express from "express";

import {
  getAllReportUserRequests,
  createReport,
  acceptReport,
  denyReport,
  banUserReports,
  deleteUserReports,
  getAllReportsOfUser,
  getAllGroupsOfUserId,
  getAllPostsOfUserId,
} from "../controllers/report.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/user/list/all", auth, getAllReportUserRequests);
router.get("/:userId/list/pending", auth, getAllReportsOfUser);
router.get("/:userId/list/groups", auth, getAllGroupsOfUserId);
router.get("/:userId/list/posts", auth, getAllPostsOfUserId);

router.post("/create", auth, createReport);

router.put("/:idReport/accept", auth, acceptReport);
router.put("/:idReport/deny", auth, denyReport);

router.delete("/:userId/banUser", auth, banUserReports);
router.delete("/:userId/deleteAllReports", auth, deleteUserReports);

export default router;
