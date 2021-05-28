import express from "express";
import GroupPendingMember from "../models/groupPendingMember.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const addGroupPendingMember = async (req, res) => {
  const groupPendingMember = req.body;

  if (groupPendingMember._id) {
    return res
      .status(400)
      .json("New group pending member mustn't have _id field");
  }

  const newGroupPendingMember = new GroupPendingMember({
    ...groupPendingMember,
    //userId: req.userId,
  });

  try {
    await newGroupPendingMember.save();
    res.status(httpStatusCodes.created).json(newGroupPendingMember);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
