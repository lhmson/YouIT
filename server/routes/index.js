import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("<h5>Welcome to YouIT api</h5>");
});

export default router;
