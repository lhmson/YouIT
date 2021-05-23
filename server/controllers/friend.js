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
export const getNumberMutualFriends = async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const user1 = await User.findById(userId1);
    const user2 = await User.findById(userId2);

    const listId1 = user1.listFriends;
    const listId2 = user2.listFriends;
    const listId = listId1.filter((id) => listId2.includes(id));
    const listUser = [];

    for (let i = 0; i < listId.length; i++)
      listUser.push(await User.findById(listId[i]));

    res.status(200).json(listUser.length);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

export const getListMutualFriends = async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const user1 = await User.findById(userId1);
    const user2 = await User.findById(userId2);

    const listId1 = user1.listFriends;
    const listId2 = user2.listFriends;
    const listId = listId1.filter((id) => listId2.includes(id));
    const listUser = [];

    for (let i = 0; i < listId.length; i++)
      listUser.push(await User.findById(listId[i]));

    res.status(200).json(listUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};
