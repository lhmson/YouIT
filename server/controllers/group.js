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
        .json("Thy cute dang iu hong duoc cua nhe");

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
    userId: req.userId,
  });

  try {
    await newGroup.save();
    res.status(httpStatusCodes.created).json(newGroup);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
