import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";

// GET search/user
export const getAllUser = async (req, res) => {
  // auth
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const listUser = await User.find({});
    res.status(200).json(listUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET search/user
export const getSearchUser = async (req, res) => {
  // auth
  const { nameUser } = req.params;
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const currentUser = await (await User.find({})).filter((user) =>
      user.name.includes(nameUser)
    );
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
