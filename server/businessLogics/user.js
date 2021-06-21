import mongoose from "mongoose";
import User from "../models/user.js";
import FriendRequest from "../models/friendrequest.js";
import CuteServerIO from "../socket/CuteServerIO.js";

/**
 * @param {string | mongoose.Types.ObjectId } userId1
 * @param {string | mongoose.Types.ObjectId } userId2
 * @returns {"Self" | "Friend" | "Stranger" | "Unknown"} returns "Unknown" iff a user is not found or there were any errors
 */
export const getRelationship = async (userId1, userId2) => {
  if (!userId1 || !userId2) return false;

  userId1 = userId1.toString();
  userId2 = userId2.toString();

  if (userId1 === userId2) return "Self";

  try {
    const user1 = (await User.findById(userId1)).toObject();
    const user2 = (await User.findById(userId2)).toObject();

    // small optimization
    if (user1.listFriends.length < user2.listFriends.length) {
      if (user1.listFriends.find((user) => user.toString() === userId2))
        return "Friend";
      else return "Stranger";
    } else {
      if (user2.listFriends.find((user) => user.toString() === userId1))
        return "Friend";
      else return "Stranger";
    }
  } catch (error) {
    return "Unknown";
  }

  return "Unknown";
};

/**
 * @param {string | mongoose.Types.ObjectId } userId1
 * @param {string | mongoose.Types.ObjectId } userId2
 * @returns {"true" | "false" | "Stranger" | "Unknown"} returns "true" if a user 1 sended request friend to user 2
 */
export const isUserA_sendedRequestFriend_UserB = async (userId1, userId2) => {
  try {
    const requestData = await FriendRequest.find();

    for (let i = 0; i < requestData.length; i++)
      if (
        requestData[i].userSendRequestId.equals(userId1) &&
        requestData[i].userConfirmId.equals(userId2)
      ) {
        return true;
      }
    return false;
  } catch (error) {
    return "Unknown";
  }
};

/** @param {string} userId */
export const isValidUser = async (userId) => {
  if (!userId) return false;

  const user = await User.findById(userId);

  if (!user) return false;

  return true;
};

/**
 * @param {CuteServerIO} cuteIO
 * @returns {(userId: string, newStatus: string) => any}
 */
export const notifyUserStatusToFriendsFunc =
  (cuteIO) => (userId, newStatus) => {
    User.findById(userId).then((user) => {
      if (!user) return;

      const { listFriends } = user;
      if (listFriends)
        listFriends.forEach((friendId) => {
          cuteIO.sendToUser(friendId, "System-updateStatusUser", {
            userId,
            newStatus,
          });
        });

      // send to self
      cuteIO.sendToUser(userId, "System-updateStatusUser", {
        userId,
        newStatus,
      });
    });
  };

export const haveMatchingFriendRequest = async (userId1, userId2) => {
  try {
    const friendRequests = await FriendRequest.find();
    if (!friendRequests) return false;

    for (var request of friendRequests) {
      const listUserId = [
        request?.userConfirmId.toString(),
        request?.userSendRequestId.toString(),
      ];
      if (listUserId.includes(userId1) && listUserId.includes(userId2))
        return true;
    }

    return false;
  } catch (error) {
    console.log("haveMatchingFriendRequest error", error);
  }
};
