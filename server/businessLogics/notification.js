import Notification from "../models/notification.js";
import { cuteIO } from "../index.js";
// import { request } from "express";

/**
 * Add a new notification to Database, then send it to user
 * @param {{userId, content, image, kind, link, seen}} notification
 */
export const sendNotificationUser = async (notification) => {
  try {
    const { userId, kind } = notification;
    const notificationDoc = new Notification(notification);
    await notificationDoc.save();
    cuteIO.sendToUser(userId, "Notification-" + kind, notificationDoc);
  } catch (error) {
    throw error;
  }
};

export const sendRequestUser = (request) => {
  try {
    const { userId, kind } = request;
    cuteIO.sendToUser(userId, "Request-" + kind, request);
  } catch (error) {
    throw error;
  }
};