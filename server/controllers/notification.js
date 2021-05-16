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
