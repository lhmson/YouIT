import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";
import Report from "../models/report.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

export const getAllReportUserRequests = async (req, res) => {
  try {
    const requests = await Report.find({ kind: "user" });
    return res.status(httpStatusCodes.ok).json(requests);
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
    let Report = await Report.findById(idReport);

    Report.status = "deny";
    await Report.save();
    res.status(httpStatusCodes.ok).json(Report);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
