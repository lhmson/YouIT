import Notification from "../models/notification.js"
import { setDatabaseCleaner } from "../utils/DatabaseCleaner.js"

const notificationValidator = async (doc) => {
  if (doc?.seen && (Date.now() - doc.seenAt >= 60 * 60 * 1000)) {
    return false;
  }

  return true;
}

export const setAllDatabaseCleaners = () => {
  setDatabaseCleaner(Notification, notificationValidator, 30 * 60 * 1000);
}