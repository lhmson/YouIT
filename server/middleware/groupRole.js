import express from "express";
import { isMemberOfGroup } from "../businessLogics/group.js";
import Group from "../models/group.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

export const isOwner = async (req, res, next) => {
  try {
    const groupId = req.params?.id; // id group
    const userId = req.userId;

    const group = await Group.findById(groupId);

    if (!group) return res.status(404).json({ message: "Group not exists" });
    const { listMembers } = group;

    const ownerId = listMembers[0]?.userId;

    if (ownerId.equals(userId)) {
      return next?.();
    }
    return res.status(403).json({ message: "Youre not the group owner" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const haveGroupPermission = (minimalRole) => async (req, res, next) => {
  // minimalRole la role thap nhat co quyen han thuc hien 1 api
  const groupId = req.params.id;
  const { userId } = req;

  try {
    var roles = ["Owner", "Admin", "Moderator", "Member"];

    // remove roles that not have permission
    const minimalRoleIndex = roles.indexOf(minimalRole);
    roles.length = minimalRoleIndex + 1;

    const group = await Group.findById(groupId);

    if (!group) {
      console.log("Group not exists");
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "Group not exists" });
    }

    if (!isMemberOfGroup(userId, group)) {
      return res
        .status(httpStatusCodes.forbidden)
        .json({ message: "You're not a member of group" });
    }

    const groupMember = group?.listMembers.find((member) =>
      member.userId.equals(userId)
    );

    if (roles.includes(groupMember?.role)) {
      return next?.();
    }
    return res
      .status(httpStatusCodes.forbidden)
      .json({ message: "You don't have permission" });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
