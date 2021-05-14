import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

// GET userinfo/:id
export const getUserInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const currentUser = await User.findById(id);
    res.status(200).json(currentUser);
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

// use for updating receiver
export const addReceivingFriendRequest = async (req, res) => {
  const friendRequest = req.body;
  //console.log(friendRequest);
  try {
    // update receiver
    await User.findById(friendRequest.userConfirmId).then((user) => {
      if (!user.listReceivingFriendRequests.includes(friendRequest._id)) {
        user.listReceivingFriendRequests.push(friendRequest._id);
        user.save();
        res.status(httpStatusCodes.ok).json(user);
      } else {
        res.json({ message: "Friend request exists" });
      }
    });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const removeReceivingFriendRequest = async (req, res) => {
  const friendRequest = req.body;
  //console.log(friendRequest);
  try {
    // update receiver
    await User.findById(friendRequest.userConfirmId).then((user) => {
      user.listReceivingFriendRequests =
        user.listReceivingFriendRequests.filter(
          (item) => item != friendRequest._id
        );
      user.save();
      res.status(httpStatusCodes.ok).json(user);
    });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// use for updating sender
export const addSendingFriendRequest = async (req, res) => {
  const friendRequest = req.body;

  try {
    // update sender
    await User.findById(friendRequest.userSendRequestId).then((user) => {
      if (!user.listSendingFriendRequests.includes(friendRequest._id)) {
        user.listSendingFriendRequests.push(friendRequest._id);
        user.save();
        res.status(httpStatusCodes.ok).json(user);
      } else {
        res.json({ message: "Friend request exists" });
      }
    });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const removeSendingFriendRequest = async (req, res) => {
  const friendRequest = req.body;
  try {
    // update receiver
    await User.findById(friendRequest.userSendRequestId).then((user) => {
      user.listSendingFriendRequests = user.listSendingFriendRequests.filter(
        // item is object
        // friendRequest._id is string
        // type different => can't use !==
        (item) => item != friendRequest._id
      );
      user.save();
      res.status(httpStatusCodes.ok).json(user);
    });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
