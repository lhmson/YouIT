import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";

// GET userinfo/my
export const getMyUserInfo = async (req, res) => {
  // auth
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const currentUser = await User.findById(req.userId);
    const infoId = currentUser.userInfo._id;

    if (!infoId) {
      res.status(404).json(`Cannot find an user's info with id ${infoId}`);
      return;
    }

    const { userInfo } = currentUser;

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT userinfo/:id
export const updateUserInfo = async (req, res) => {
  const { userId } = req;
  if (!userId) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const updatedUser = req.body;
    //const { userInfo } = updatedUser;
    if (!updatedUser)
      return res.status(400).send(`New user information is required`);

    await User.findByIdAndUpdate(userId, updatedUser);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
