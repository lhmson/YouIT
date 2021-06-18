import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";
import Report from "../models/report.js";
import Group from "../models/group.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

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

const countReport = async (userId) => {
  const reports = await Report.find({
    status: "pending",
    kind: "user",
    itemId: userId,
  });
  const count = reports.length;
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
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < requests.length; j++)
        if (requests[j].itemId.equals(users[i]._id)) {
          const countGroups = await countJoinedGroup(userId);
          const countReports = await countReport(userId);
          const infoUser = {
            name: users[i].name,
            _id: users[i]._id,
            numberOfGroups: countGroups,
            numberOfReports: countReports,
          };
          pendingReports.push(infoUser);
          break;
        }
    }

    return res.status(httpStatusCodes.ok).json(pendingReports);
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
