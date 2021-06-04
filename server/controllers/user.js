import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import sendVerificationMail from "../utils/sendVerificationMail.js";

import { cuteIO, usersStatusManager } from "../index.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

const JWT_KEY = "youit";

export const signin = async (req, res) => {
  const { email, password, browserId } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!user.activated)
      return res.status(401).json({ message: "Unactivated", result: user });

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_KEY, {
      // expiresIn: "24h",
    });

    if (browserId) {
      cuteIO.sendToBrowser(browserId, "System-SignedIn", {});
    }

    res.status(200).json({ result: user, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resendVerificationMail = async (req, res) => {
  const { email } = req.body;
  try {
    sendVerificationMail(email);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, gender, dob } = req.body;

  try {
    // console.log("email", email);
    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newInfo = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dateOfBirth: dob,
    };

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      userInfo: newInfo,
    });

    // const token = jwt.sign({ email: result.email, id: result._id }, secret, {
    //   expiresIn: "24h",
    // });

    sendVerificationMail(email);

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const changePassword = async (req, res) => {
  const { userId } = req;
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
      },
      { new: true },
      function (err, arr) {
        if (err) res.status(500).json(err);
        res.status(200).json(arr);
      }
    );

    // const token = jwt.sign({ email: result.email, id: result._id }, secret, {
    //   expiresIn: "24h",
    // });
  } catch (error) {
    res.status(500).json(error);

    console.log(error);
  }
};

export const checkPassword = async (req, res) => {
  const { userId } = req;
  const { password } = req.params;
  try {
    if (!userId) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "Unauthenticated" });
    }
    const user = await User.findById(userId);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json(false);
    res.status(200).json(true);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, JWT_KEY, function (error, decoded) {
      if (error) {
        res.status(410).json(error);
      } else {
        User.findById(decoded.id).then((user) => {
          if (user.activated === true) res.status(409).json("alreadyActivated");
        });
        User.findByIdAndUpdate(
          decoded.id,
          {
            activated: true,
          },
          { new: true },
          function (err, arr) {
            if (err) res.status(500).json(err);
            res.status(200).json(arr);
          }
        );
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const signout = async (req, res) => {
  const { browserId } = req.body;

  if (browserId) {
    cuteIO.sendToBrowser(browserId, "System-InvalidToken", {
      enableAlert: false,
    });
  }

  res.status(httpStatusCodes.accepted).send("Ok");
};


/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getFriendsStatus = async (req, res, next) => {
  const { userId } = req;

  if (!userId) {
    return res.status(httpStatusCodes.unauthorized).send("Not signed in");
  }

  try {
    const user = await User.findById(userId);

    if (!user)
      return res.status(httpStatusCodes.notFound).send("Signed in user's not found");

    const result = {};

    const { listFriends } = user;
    if (listFriends)
      listFriends.forEach(frId => {
        result[frId] = usersStatusManager.getUserStatus(frId);
      });

    return res.status(httpStatusCodes.ok).send(result);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
}

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const setUserStatus = async (req, res, next) => {
  const { userId } = req;
  const { newStatus } = req.params;

  if (!userId) {
    return res.status(httpStatusCodes.unauthorized).send("Not signed in");
  }

  try {
    if (!["busy", "online", "offline"].includes(newStatus))
      return res.status(httpStatusCodes.badContent).send(`${newStatus} is not a valid status. (only "busy", "online", "offline" are acceptable)`);
    usersStatusManager.setLockedStatus(newStatus);

    return res.status(httpStatusCodes.ok).send("Ok");
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
}