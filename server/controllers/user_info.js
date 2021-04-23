import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";

// GET userinfo/
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

// // POST userinfo/
// export const createUserInfo = async (req, res) => {
//   const userInfo = req.body;

//   const newUserInfo = new UserInfo({
//     ...userInfo,
//   });

//   try {
//     await newUserInfo.save();

//     res.status(201).json(newUserInfo);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

// // PUT userinfo/
// export const updateUserInfo = async (req, res) => {
//   const { id } = req.params;
//   const { title, message, creatorId, selectedFile, tags, likes } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No user info with id: ${id}`);

//   const updatedUserInfo = {
//     creatorId,
//     title,
//     message,
//     tags,
//     selectedFile,
//     likes,
//     _id: id,
//   };

//   await UserInfo.findByIdAndUpdate(id, updatedUserInfo, { new: true });

//   res.json(updatedUserInfo);
// };
