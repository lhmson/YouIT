import express from "express";
import Group from "../models/group.js";
import { isMemberOfGroup } from "../businessLogics/group.js";
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
          .json({ message: err.message });
      });
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
export const getJoinedGroups = async (req, res) => {
  const { userId } = req;

  if (!userId)
    return res
      .status(httpStatusCodes.unauthorized)
      .json({ message: "You must sign in to fetch list of your group" });

  try {
    const groups = await (await Group.find())
      .map((g) => g.toObject())
      .filter((g) => isMemberOfGroup(userId, g));
    return res.status(httpStatusCodes.accepted).json(groups);
  } catch (error) {
    return res.status(httpStatusCodes.internalServerError).json({ error });
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

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const addGroupMember = async (req, res) => {
  const { id, memberId } = req.params;
  //const { role } = req.query ?? "Member";
  const role = "Member";
  const addMember = { role, userId: memberId };
  try {
    // chua check group ton tai, user da la member trong group,...
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

export const addGroupPendingMember = async (req, res) => {
  const { id, memberId } = req.params;
  const pendingMember = { userId: memberId };

  try {
    const group = await Group.findById(id);
    if (!group) {
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "Group not exists" });
    }

    const { listPendingMembers } = group;

    const mapPendingMembers = listPendingMembers?.filter((member) =>
      member.userId.equals(memberId)
    );

    if (isMemberOfGroup(memberId, group))
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "Member existed" });

    if (mapPendingMembers.length !== 0)
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "Member existed" });

    group.listPendingMembers.push(pendingMember);
    await group.save();
    return res.status(httpStatusCodes.ok).json(group);
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
export const removeGroupPendingMember = async (req, res) => {
  const { id, memberId } = req.params;

  try {
    const group = await Group.findById(id);

    if (!group) {
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "Group not exists" });
    }

    const newPendingMembers = group.listPendingMembers.filter(
      (member) => member?.userId != memberId
    );
    group.listPendingMembers = newPendingMembers;

    await group.save();
    res.status(httpStatusCodes.ok).json(group);
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
