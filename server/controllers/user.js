import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import sendVerificationMail from "../utils/sendVerificationMail.js";

const JWT_KEY = "youit";

export const signin = async (req, res) => {
  console.log("signin");
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!user.activated)
      return res.status(401).json({ message: "Unactivated", result: user });

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_KEY, {
      expiresIn: "24h",
    });

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
