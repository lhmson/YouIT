import Notification from '../models/notification.js'
import { cuteIO } from "../index.js"

/**
 * Add a new notification to Database, then send it to user
 * @param {{userId, content, image, kind, link, seen}} notification 
 */
export const notifyUser = async (notification) => {
  try {
    const { userId, kind } = notification;
    const notificationDoc = new Notification(notification);
    await notificationDoc.save();

    cuteIO.sendToUser(userId, kind, notification);
  }
  catch (error) {
    throw error
  }
}