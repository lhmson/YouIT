import express from "express";
import mongoose from "mongoose";
import User from "../models/user";

import UserInfo from "../models/user_info";

// GET userinfo/
export const getUserInfo = async (req, res) => {
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

    const userInfo = UserInfo.findById(infoId);

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
