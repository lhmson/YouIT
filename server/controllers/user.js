import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User from "../models/user.js";

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
      return res.status(401).json({ message: "Unactivated" });
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ result: user, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
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

    const token = jwt.sign({ email: result.email, id: result._id }, JWT_KEY, {
      expiresIn: "24h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "youit.app@gmail.com",
        pass: "youIT123", // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const mailContent = `
    <h2>Hey, ${firstName} ${lastName}</h2>
    <p>To complete the process, please verify your email address by clicking the link below or pasting it into your browser:</p>
    <a>http://localhost:3000/activate/${token}</a>
    <p>The above activation link expires in 30 minutes.</p>
    <h3>YouIT Team</p>
    `;

    const mailOptions = {
      from: "youit.app@gmail.com",
      to: "muiheoconghau@gmail.com",
      subject: "Verify Your Email Address",
      generateTextFromHTML: true,
      html: mailContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

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
  console.log("password", req.body);
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
