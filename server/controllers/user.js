import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import sendVerificationMail from "../utils/sendVerificationMail.js";

import { cuteIO, usersStatusManager } from "../index.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import moment from "moment";
import { fetchGitHubUser, getAccessToken } from "../businessLogics/auth.js";

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
      // firstName: firstName,
      // lastName: lastName,
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
      return res
        .status(httpStatusCodes.notFound)
        .send("Signed in user's not found");

    const result = {};

    const { listFriends } = user;
    if (listFriends)
      listFriends.forEach((frId) => {
        result[frId] = usersStatusManager.getUserStatus(frId);
      });

    return res.status(httpStatusCodes.ok).send(result);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getUserStatus = async (req, res, next) => {
  const { userId } = req;
  const { newStatus } = req.params;

  if (!userId) {
    return res.status(httpStatusCodes.unauthorized).send("Not signed in");
  }

  try {
    return res
      .status(httpStatusCodes.ok)
      .send(usersStatusManager.getUserStatus(userId));
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
};

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
      return res
        .status(httpStatusCodes.badContent)
        .send(
          `${newStatus} is not a valid status. (only "busy", "online", "offline" are acceptable)`
        );
    usersStatusManager.setLockedStatus(userId, newStatus);

    return res.status(httpStatusCodes.ok).send("Ok");
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
};

export const countNewUsers = async (req, res) => {
  const { range, timeString } = req.params;
  try {
    let time = moment(timeString);
    let labels = [];
    let data = [];

    switch (range) {
      case "week":
        labels = moment.weekdaysShort();
        for (let i = 0; i < labels.length; i++) {
          let temp = time.clone().set("day", i);
          const start = temp.clone().startOf("day");
          const end = temp.clone().endOf("day");
          const count = await User.find({
            createdAt: { $gt: start, $lte: end },
          }).count();
          data.push(count);
        }
        break;
      case "month":
        for (let i = 0; i < time.daysInMonth(); i++) {
          labels.push(i + 1);
          let temp = time.clone().set("date", i);
          const start = temp.clone().startOf("day");
          const end = temp.clone().endOf("day");
          const count = await User.find({
            createdAt: { $gt: start, $lte: end },
          }).count();
          data.push(count);
        }
        break;
      case "year":
        labels = moment.monthsShort();
        for (let i = 0; i < labels.length; i++) {
          let temp = time.clone().set("month", i);
          const start = temp.clone().startOf("month");
          const end = temp.clone().endOf("month");
          const count = await User.find({
            createdAt: { $gt: start, $lte: end },
          }).count();
          data.push(count);
        }
        break;
    }
    res.status(200).json({ labels, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signinWithGithub = async (req, res) => {
  const redirect_uri = "http://localhost:5000/user/login/github/callback";
  // console.log("yes");
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}`
  );
};

export const redirectGithubCallback = async (req, res) => {
  // console.log("code");
  const code = req.query.code;
  console.log({
    code,
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
  });
  const access_token = await getAccessToken({
    code,
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
  });

  const userGithub = await fetchGitHubUser(access_token);

  if (!userGithub) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log(userGithub);

  try {
    const user = await User.findOne({ email: userGithub.email });

    // user exists
    if (user) {
      try {
        if (!user.activated) {
          User.findByIdAndUpdate(
            user._id,
            {
              activated: true,
            },
            { new: true }
          ).then(
            (result) => {
              // if (browserId) {
              //   cuteIO.sendToBrowser(browserId, "System-SignedIn", {});
              // }
              res.redirect(
                `http://localhost:3000?github=true&token=${access_token}&name=${userGithub.name}&id=${user._id}`
              );
            }

            // res.status(200).json({ result, token: access_token })
          );

          // return res.status(401).json({ message: "Unactivated", result: user });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, JWT_KEY, {
          // expiresIn: "24h",
        });

        //TODO: get from body, browserId with Nghia
        // if (browserId) {
        //   cuteIO.sendToBrowser(browserId, "System-SignedIn", {});
        // }

        res.redirect(
          `http://localhost:3000?github=true&token=${token}&name=${userGithub.name}&id=${user._id}`
        );
        // res.status(201).json({ result: user, token: access_token });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Something went wrong with this user" });
      }
    } else {
      // user new login
      const hashedPassword = await bcrypt.hash("password", 12);

      const result = await User.create({
        email: userGithub.email,
        password: hashedPassword,
        name: userGithub.name,
        activated: true,
        avatarUrl: userGithub.avatar_url,
      });

      const token = jwt.sign({ email: result.email, id: result._id }, JWT_KEY, {
        // expiresIn: "24h",
      });

      //TODO: get from body, browserId with Nghia
      // if (browserId) {
      //   cuteIO.sendToBrowser(browserId, "System-SignedIn", {});
      // }

      // sendVerificationMail(email);

      res.redirect(
        `http://localhost:3000?github=true&token=${token}&name=${userGithub.name}&id=${user._id}`
      );
      // res.status(201).json({ result, token: access_token });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
