import express from "express";
import mongoose from "mongoose";

import User from "../models/user.js";

export const getNumberofFriends = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const { listFriends } = user;
    res.status(200).json(listFriends.length);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getListFriends = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const listId = user.listFriends;
    const listUser = [];

    for (let i = 0; i < listId.length; i++)
      listUser.push(await User.findById(listId[i]));

    res.status(200).json(listUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};
