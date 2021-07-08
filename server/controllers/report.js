import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";
import Report from "../models/report.js";
import Group from "../models/group.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import Post from "../models/post.js";

const isMemberOfGroup = (userId, group) => {
  if (group.listMembers.find((member) => member.userId.equals(userId)))
    return true;
  else return false;
};

const countJoinedGroup = async (userId) => {
  const groups = await Group.find();
  let count = 0;
  for (let i = 0; i < groups.length; i++)
    if (isMemberOfGroup(userId, groups[i])) count++;
  return count;
};

const getListGroupsJoined = async (userId) => {
  const groups = await Group.find();
  let results = [];
  for (let i = 0; i < groups.length; i++)
    if (isMemberOfGroup(userId, groups[i])) results.push(groups[i]);
  return results;
};

const countReport = async (userId) => {
  const reports = await Report.find({
    status: "pending",
    kind: "user",
    itemId: userId,
  });
  const count = reports.length;
  return count;
};

const countPost = async (userId) => {
  const posts = await Post.find({
    userId: userId,
  });
  const count = posts.length;
  return count;
};

const banUser = async (userId) => {
  const user = await User.findById(userId);
  user.isReported = true;
  await user.save();

  await deleteAllReportsUser(userId);
};

const deleteAllReportsUser = async (userId) => {
  const listReports = await Report.find({ itemId: userId, kind: "user" });
  for (let i = 0; i < listReports.length; i++) await listReports[i].delete();
};

export const banUserReports = async (req, res) => {
  try {
    const { userId } = req.params;
    await banUser(userId);
    res.status(httpStatusCodes.ok).json({});
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const deleteUserReports = async (req, res) => {
  try {
    const { userId } = req.params;
    await deleteAllReportsUser(userId);
    res.status(httpStatusCodes.ok).json({});
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getAllReportUserRequests = async (req, res) => {
  try {
    const { userId } = req;

    const requests = await Report.find({ status: "pending", kind: "user" });
    const users = await User.find();

    let pendingReports = [];
    for (let i = 0; i < users.length; i++)
      if (!users[i].isReported) {
        const countGroups = await countJoinedGroup(users[i]._id);
        const countReports = await countReport(users[i]._id);
        const countPosts = await countPost(users[i]._id);

        const infoUser = {
          name: users[i].name,
          _id: users[i]._id,
          numberOfGroups: countGroups,
          numberOfReports: countReports,
          numberOfPosts: countPosts,
        };
        pendingReports.push(infoUser);
      }

    return res.status(httpStatusCodes.ok).json(pendingReports);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getAllReportsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await Report.find({
      status: "pending",
      kind: "user",
      itemId: userId,
    });

    const listReports = [];
    for (let i = 0; i < requests.length; i++) {
      const nameUser = (await User.findById(requests[i].userReportId)).name;
      console.log("name", nameUser);
      const info = {
        content: requests[i].content,
        nameUserReport: nameUser,
      };
      listReports.push(info);
    }

    return res.status(httpStatusCodes.ok).json(listReports);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const report = req.body;
    const newReport = new Report(report);
    await newReport.save();
    res.status(httpStatusCodes.created).json(newReport);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const acceptReport = async (req, res) => {
  try {
    const { idReport } = req.params;
    let Report = await Report.findById(idReport);

    Report.status = "accept";
    await Report.save();
    res.status(httpStatusCodes.ok).json(Report);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const denyReport = async (req, res) => {
  try {
    const { idReport } = req.params;
    await Report.findByIdAndDelete(idReport);
    res.status(httpStatusCodes.ok).json({});
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getAllGroupsOfUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const groups = await getListGroupsJoined(userId);
    return res.status(httpStatusCodes.ok).json(groups);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getAllPostsOfUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({
      userId: userId,
    });
    return res.status(httpStatusCodes.ok).json(posts);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
