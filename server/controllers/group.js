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
