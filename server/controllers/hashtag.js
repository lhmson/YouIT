import express from "express";
import Hashtag from "../models/hashtag.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const createHashtag = async (req, res) => {
  const hashtag = req.body;

  if (hashtag._id) {
    return res
      .status(httpStatusCodes.badContent)
      .json("New hashtag mustn't have _id field");
  }

  try {
    const newHashtag = new Hashtag({
      ...hashtag,
    });
    await newHashtag.save();
    return res.status(httpStatusCodes.created).json(newHashtag);
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
export const getAllHashtags = async (req, res) => {
  try {
    const hashtags = await Hashtag.find();
    return res.status(httpStatusCodes.ok).json(hashtags);
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
export const getAHashtag = async (req, res) => {
  const { id } = req.params;

  try {
    await Hashtag.findById(id).then((hashtag) => {
      return res.status(httpStatusCodes.ok).json(hashtag);
    });
    return res
      .status(httpStatusCodes.notFound)
      .json({ message: "Hashtag not found" });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
