import express from "express";
import FriendRequest from "../models/friendrequest.js";
import User from "../models/user.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

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
export const getAFriendRequest = async (req, res) => {};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const deleteFriendRequest = async (req, res) => {};
