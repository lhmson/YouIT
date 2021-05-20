import express from "express";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import Notification from "../models/notification.js";

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getUserNotifications = async (req, res, next) => {
  /** @type {{opt: "seen" | "unseen" | undefined}} */
  const { opt } = req.query;
  const { userId } = req;

  if (!userId)
    return res.status(httpStatusCodes.unauthorized).json({
      message:
        'Unauthenticated: user have to sign in to fetch "my notifications"',
    });

  try {
    let filterCond = { userId }

    switch (opt) {
      case "seen":
        filterCond.seen = true;
        break;
      case "unseen":
        filterCond.seen = false;
        break;
    }

    const notifications = await Notification.find(filterCond).sort({
      createdAt: -1,
    });
    return res.status(httpStatusCodes.ok).json(notifications);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};


/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const setSeen = async (req, res, next) => {
  let { notificationId, newValue } = req.params
  const { userId } = req;

  newValue = ((newValue === "true") || (newValue === "seen"))

  if (!userId)
    return res.status(httpStatusCodes.unauthorized).json({
      message:
        'Unauthenticated: user have to sign in to fetch "my notifications"',
    });

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification)
      return res.status(httpStatusCodes.notFound).json({
        message: `No notification with id = ${notificationId}`
      })

    if (notification.userId.toString() !== userId) {
      return res.status(httpStatusCodes.unauthorized).json({
        message: `You can not update other people's notification`
      })
    }

    await Notification.findByIdAndUpdate(notificationId, { seen: newValue }, { new: true })
      .exec()
      .then(
        newNotification => res.status(httpStatusCodes.ok).json(newNotification)
      );
  }
  catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
}