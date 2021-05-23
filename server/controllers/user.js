import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  console.log("signin");
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
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
    if (user) return res.status(400).json({ message: "User already exists" });

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
  const { password } = req.body;

  try {
    if (!userId) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "Unauthenticated" });
    }
    const user = await User.findById(userId);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ result: false });

    res.status(200).json({ result: true });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
