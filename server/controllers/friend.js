import express from "express";
import mongoose from "mongoose";

import User from "../models/user.js";
import FriendRequest from "../models/friendrequest.js";
import Hashtag from "../models/hashtag.js";

export const getNumberofFriends = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const { listFriends } = user;
    let count = 0;
    for (let i = 0; i < listFriends.length; i++) if (listFriends[i]) count++;
    res.status(200).json(count);
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

export const getListRequestFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const listReq = await FriendRequest.find();
    const listReqID = listReq.filter((reqFriend) =>
      reqFriend.userConfirmId.equals(userId)
    );

    const result = [];
    for (let i = 0; i < listReqID.length; i++)
      if (!result.includes(listReqID[i].userSendRequestId))
        result.push(listReqID[i].userSendRequestId);

    const listUser = [];
    for (let i = 0; i < result.length; i++) {
      const user = await User.findById(result[i]);
      listUser.push(user);
    }

    res.status(200).json(listUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

export const checkFriends = async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const user = await User.findById(userId1);
    if (!user) return res.status(404).json({ message: "User not exists" });

    const { listFriends } = user;

    res.status(200).json(listFriends.includes(userId2));
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

const checkListFriends = (userId, listFriends) => {
  for (let i = 0; i < listFriends.length; i++)
    if (listFriends[i].equals(userId)) return false;
  return true;
};

const getListMutual = async (user1, user2) => {
  const listId1 = user1.listFriends;
  const listId2 = user2.listFriends;
  const listId = listId1.filter((id) => listId2.includes(id));
  const listUser = [];

  for (let i = 0; i < listId.length; i++)
    listUser.push(await Hashtag.findById(listId[i]));

  return listUser;
};

const getMutualHashtag = async (user1, user2) => {
  const listId1 = user1.userInfo.programmingHashtags;
  const listId2 = user2.userInfo.programmingHashtags;
  const listId = listId1.filter((id) => listId2.includes(id));
  const listUser = [];

  for (let i = 0; i < listId.length; i++)
    listUser.push(await Hashtag.findById(listId[i]));

  return listUser;
};

export const getListSuggestFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    const users = await User.find();
    const hashtagTemp = await Hashtag.find({ name: "youit" });
    const { listFriends } = user;
    const listSugg = [];
    for (let i = 0; i < users.length; i++)
      if (
        checkListFriends(users[i]._id, listFriends) &&
        !users[i]._id.equals(userId)
      ) {
        const listMutuals = await getListMutual(user, users[i]);
        const hashtags = await getMutualHashtag(user, users[i]);

        if (listMutuals.length >= 2) {
          const temp = {
            userId: users[i]._id,
            avatarUrl: users[i]?.avatarUrl,
            name: users[i].name,
            avatarUrl1: listMutuals[0]?.avatarUrl,
            avatarUrl2: listMutuals[1]?.avatarUrl,
            numberMutualFriends: listMutuals.length,
            hashtag: hashtags?.length > 0 ? hashtags[0] : hashtagTemp[0],
          };

          listSugg.push(temp);
          if (listSugg.length === 4) break;
        }
      }

    if (listSugg.length <= 4) {
      for (let i = 0; i < users.length; i++)
        if (
          checkListFriends(users[i]._id, listFriends) &&
          !users[i]._id.equals(userId)
        ) {
          const hashtags = await getMutualHashtag(user, users[i]);
          const listMutuals = await getListMutual(user, users[i]);
          if (listMutuals.length < 2 && hashtags.length > 0) {
            const temp = {
              userId: users[i]._id,
              avatarUrl: users[i]?.avatarUrl,
              name: users[i].name,
              avatarUrl1: listMutuals[0]?.avatarUrl,
              avatarUrl2: listMutuals[1]?.avatarUrl,
              numberMutualFriends: listMutuals.length,
              hashtag: hashtags?.length > 0 ? hashtags[0] : hashtagTemp[0],
            };
            listSugg.push(temp);
            if (listSugg.length === 4) break;
          }
        }
    }

    if (listSugg.length <= 4) {
      for (let i = 0; i < users.length; i++)
        if (
          checkListFriends(users[i]._id, listFriends) &&
          !users[i]._id.equals(userId)
        ) {
          const hashtags = await getMutualHashtag(user, users[i]);
          const listMutuals = await getListMutual(user, users[i]);
          if (listMutuals.length < 2 && hashtags.length === 0) {
            const temp = {
              userId: users[i]._id,
              avatarUrl: users[i]?.avatarUrl,
              name: users[i].name,
              avatarUrl1: listMutuals[0]?.avatarUrl,
              avatarUrl2: listMutuals[1]?.avatarUrl,
              numberMutualFriends: listMutuals.length,
              hashtag: hashtagTemp[0],
            };
            listSugg.push(temp);
            if (listSugg.length === 4) break;
          }
        }
    }

    if (listSugg) res.status(200).json(listSugg);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};
