import express from "express";
import Group from "../models/group.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getAGroup = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { userId } = req;
    if (!userId)
      res
        .status(httpStatusCodes.unauthorized)
        .json(".... // cho nay k login k vao dc");

    Group.findById(id)
      .then((group) => {
        if (group) return res.status(httpStatusCodes.ok).json(group);
        else
          return res
            .status(httpStatusCodes.notFound)
            .json(`Cannot find a group with id: ${id}`);
      })
      .catch((err) => {
        return res
          .status(httpStatusCodes.internalServerError)
          .json({ message: error.message });
      });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const createGroup = async (req, res) => {
  const group = req.body;

  if (group._id) {
    return res.status(400).json("New group mustn't have _id field");
  }

  const newGroup = new Group({
    ...group,
    //userId: req.userId,
  });

  try {
    await newGroup.save();
    const groupOwner = { role: "Owner", userId: req.userId };
    newGroup.listMembers.push(groupOwner);
    await newGroup.save();
    res.status(httpStatusCodes.created).json(newGroup);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const addGroupMember = async (req, res) => {
  const { id, memberId } = req.params;
  const { role } = req.query ?? "Member";
  const addMember = { role, userId: memberId };

  try {
    await Group.findById(id).then(async (group) => {
      group.listMembers.push(addMember);
      await group.save();
      return res.status(httpStatusCodes.ok).json(group);
    });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    // auth
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!(await Group.findById(id))) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`No group with id: ${id}`);
    }

    await Group.findByIdAndRemove(id);
    res
      .status(httpStatusCodes.ok)
      .json({ message: "Group deleted successfully." });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
