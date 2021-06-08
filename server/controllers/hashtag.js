import express from "express";
import mongoose from "mongoose";
import Hashtag from "../models/hashtag.js";
import User from "../models/user.js";
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
    const hashtags = await Hashtag.find();

    const existedHashtag = hashtags.find((tag) => tag?.name === hashtag?.name);
    if (existedHashtag) {
      existedHashtag.count++;
      await existedHashtag.save();
      return res.status(httpStatusCodes.ok).json(existedHashtag);
    }

    const newHashtag = new Hashtag({
      ...hashtag,
      count: 1,
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

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const deleteHashtag = async (req, res) => {
  const { hashtagId } = req.params;

  try {
    const hashtag = await Hashtag.findById(hashtagId);

    if (!hashtag)
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "Hashtag not found" });

    if (hashtag.count > 1) {
      hashtag.count--;
      await hashtag.save();
      return res.status(httpStatusCodes.ok).json(hashtag);
    }

    await hashtag.remove();
    return res
      .status(httpStatusCodes.ok)
      .json({ message: "Delete hashtag successfully" });
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
export const getUserProgrammingHashtags = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = (await User.findById(userId)).toObject();

    if (!user)
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "User not found" });

    let programmingHashtags = [];
    const listHashtagId = user?.userInfo?.programmingHashtags;

    for (var id of listHashtagId) {
      const hashtag = await Hashtag.findById(id);
      programmingHashtags.push(hashtag);
    }

    return res.status(httpStatusCodes.ok).json(programmingHashtags);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
