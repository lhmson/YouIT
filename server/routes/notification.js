import express from "express";
import * as controllers from "../controllers/notification.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// router.get("/:id", controllers.getANotification);
router.get("/my", auth, controllers.getUserNotifications);

router.put("/setSeen/:notificationId/:newValue", auth, controllers.setSeen);

export default router;
