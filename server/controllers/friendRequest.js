import express from "express";
import FriendRequest from "../models/friendrequest.js";
import User from "../models/user.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import { sendRequestUser } from "../businessLogics/notification.js";

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const createFriendRequest = async (req, res) => {
  const friendRequest = req.body;

  // new request shouldn't have an _id in it
  if (friendRequest._id) {
    return res.status(400).json("New request mustn't have _id field");
  }

  const newFriendRequest = new FriendRequest(friendRequest);
  try {
    // create new friend request
    await newFriendRequest.save();

    const requestSender = await User.findById(friendRequest.userSendRequestId);
    const requestReceiver = await User.findById(friendRequest.userConfirmId);

    // Send notification to partner
    sendRequestUser({
      userId: friendRequest.userConfirmId,
      content: {
        requestReceiver,
        description: `${requestSender?.name} has sent you a friend request`,
      },
      kind: "FriendRequest_RequestReceiver",
    });

    res.status(httpStatusCodes.created).json(newFriendRequest);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getAFriendRequest = async (req, res) => { };

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getAllFriendRequests = async (req, res) => {
  try {
    const friendRequests = await FriendRequest.find();
    return res.status(httpStatusCodes.ok).json(friendRequests);
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
export const deleteFriendRequest = async (req, res) => {
  const { id } = req.params;

  try {
    // auth
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!(await FriendRequest.findById(id))) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`No friend request with id: ${id}`);
    }

    await FriendRequest.findByIdAndRemove(id);
    res
      .status(httpStatusCodes.ok)
      .json({ message: "Friend request deleted successfully." });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
