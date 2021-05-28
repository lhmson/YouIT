import express from "express";
import Group from "../models/group.js";

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
