import mongoose from 'mongoose';
import User from '../models/user.js';

/**
 * @param {string | mongoose.Types.ObjectId } userId1 
 * @param {string | mongoose.Types.ObjectId } userId2
 * @returns {"Self" | "Friend" | "Stranger" | "Unknown"} returns "Unknown" iff a user is not found or there were any errors
 */
export const getRelationship = async (userId1, userId2) => {
  if (!userId1 || !userId2)
    return false;

  userId1 = userId1.toString();
  userId2 = userId2.toString();

  if (userId1 === userId2)
    return "Self";

  try {
    const user1 = (await User.findById(userId1)).toObject();
    const user2 = (await User.findById(userId2)).toObject();

    // small optimization
    if (user1.listFriends.length < user2.listFriends.length) {
      if (user1.listFriends.find(user => user.toString() === userId2))
        return "Friend"
      else
        return "Stranger"
    }
    else {
      if (user2.listFriends.find(user => user.toString() === userId1))
        return "Friend"
      else
        return "Stranger"
    }
  }
  catch (error) {
    return "Unknown";
  }

  return "Unknown";
}