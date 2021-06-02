import express from "express";
import Group from "../models/group.js";
import User from "../models/user.js";
import { groupMemberSchema } from "../models/groupMember.js";
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
    // await newGroup.save();
    const groupOwner = { role: "Owner", userId: req.userId };
    // newGroup.listMembers.push(groupOwner);
    newGroup.listMembers = [groupOwner, ...newGroup?.listMembers];
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

export const getListMembers = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findById(id).populate({
      path: "listMembers",
      populate: {
        path: "userId",
        select: "name",
        model: "User",
      },
    });

    const listUsers = group.listMembers;
    // const listMembers = [];

    // for (let i = 0; i < listUsers.length; i++)
    //   listMembers.push(await User.findById(listUsers[i].userID));

    res.status(httpStatusCodes.ok).json(listUsers); // groupMemberSchema
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

export const getListPendingMembers = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findById(id).populate({
      path: "listPendingMembers",
      populate: {
        path: "userId",
        select: "name",
        model: "User",
      },
    });

    const listUsers = group.listPendingMembers;
    // const listMembers = [];

    // for (let i = 0; i < listUsers.length; i++)
    //   listMembers.push(await User.findById(listUsers[i].userID));

    res.status(httpStatusCodes.ok).json(listUsers); // groupMemberSchema
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
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

export const deleteMember = async (req, res) => {
  const { id, deletedUserId } = req.params;

  try {
    const group = await Group.findById(id);
    if (!isMemberOfGroup(deletedUserId, group))
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "User is not a member of the group" });

    group.listMembers = group.listMembers.filter(
      (member) =>
        !member.userId.equals(deletedUserId) || member.role === "Owner"
    );

    const newGroup = await Group.findByIdAndUpdate(id, group, { new: true });
    // await group.save();
    // res.status(httpStatusCodes.ok).json(newGroup);
    res
      .status(httpStatusCodes.ok)
      .json({ message: "Member removed successfully" });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const leaveGroup = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  //console.log("thyyyyyyyyyyy", userId)
  try {
    const group = await Group.findById(id);
    if (!isMemberOfGroup(userId, group))
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "User is not a member of the group" });

    if (
      group.listMembers.length > 1 &&
      group.listMembers.find((member) => member.userId.equals(userId)).role ===
        "Owner"
    )
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "You're a group owner" });

    if (
      group.listMembers.find((member) => member.userId.equals(userId)).role ===
      "Owner"
    ) {
      await Group.findByIdAndRemove(id);
      return res
        .status(httpStatusCodes.badContent)
        .json("Group deleted successfully.");
    }

    group.listMembers = group.listMembers.filter(
      (member) => !member.userId.equals(userId) || member.role === "Owner"
    );

    const newGroup = await Group.findByIdAndUpdate(id, group, { new: true });
    // await group.save();
    res.status(httpStatusCodes.ok).json(newGroup);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
