import mongoose from "mongoose";
import Comment from "../models/comment.js";

/**
 * [immutable function] Return an object showing user's interaction with a post
 * @param {mongoose.Document|String} post a post to check :) can be either mongoose document or objectId
 * @param {mongoose.Types.ObjectId|String} userId a user to check, but I prefer Id :)
 * @param {[("upvote"|"downvote"|"react"|"hide"|"follow")]} interactionType filter out the wanted interaction type. Get all by default
 * @returns {object} An object, whose properties indicate how a user interact with a post
 */
export const getInteractionOfAUser = async (
  comment,
  userId,
  interactionType
) => {
  // cast post into mongoose document type :)
  const commentDoc =
    typeof comment === "string" ? await Comment.findById(comment) : comment;

  // cast userId into mongoose id type :)
  const userObjId = new mongoose.Types.ObjectId(userId);

  const result = {
    userId: userObjId,
    commentId: commentDoc._id,
  };

  // CuteTN Note: only user operator '==' to check for both null and undefine
  if (!interactionType || !Array.isArray(interactionType))
    interactionType = ["upvote", "downvote", "hide", "follow", "react"];

  interactionType.forEach?.((type) => {
    // except for react
    if (type === "react") return;

    const listName = getListName(type);
    result[type] =
      commentDoc.interactionInfo[listName]?.find((u) => userObjId.equals(u)) !=
      undefined;
  });

  // if (interactionType.find("react"))
  // result.react = postDoc.interactionInfo.listReactions.find(u => userObjId.equals(u)) == undefined;

  return result;
};

/**
 * @param {"upvote"|"downvote"|"react"|"hide"|"follow"} interactionType
 */
const getListName = (interactionType) => {
  const mapper = Object.freeze({
    upvote: "listUpvotes",
    downvote: "listDownvotes",
    react: "listReactions",
    hide: "listUsersHiding",
    follow: "listUsersFollowing",
  });

  return mapper[interactionType];
};

/**
 * @param {Array<ItemT>} list
 * @param {ItemT} item
 * @param {((a: ItemT, b: ItemT) => boolean)=} isEqual function to check if 2 element is equal
 * @returns {Array<ItemT>}
 * @template ItemT
 */
const addIfNotExist = (list, item, isEqual = (a, b) => a.equals(b)) => {
  if (!list || !Array.isArray(list)) return [item];

  if (list.find((x) => isEqual(item, x))) {
    return list;
  }
  return [...list, item];
};

/**
 * [Immutable function] Returns a new post with user interaction added
 * @param {mongoose.Document} post
 * @param {mongoose.Types.ObjectId | string} userId
 * @param {"upvote"|"downvote"|"react"|"hide"|"follow"} interactionType
 * @param {string} reaction
 * @return {mongoose.Document}
 */
export const addInteraction = (comment, userId, interactionType, reaction) => {
  const interactionInfo = comment.interactionInfo;

  let listName = getListName(interactionType);
  interactionInfo[listName] = addIfNotExist(
    interactionInfo[listName],
    new mongoose.Types.ObjectId(userId)
  );

  const newComment = {
    ...comment,
    interactionInfo,
  };

  return newComment;
};

/**
 * [Immutable function] Returns a new post with user interaction removed
 * @param {mongoose.Document} post
 * @param {mongoose.Types.ObjectId} userId
 * @param {"upvote"|"downvote"|"react"|"hide"|"follow"} interactionType
 * @return {mongoose.Document}
 */
export const removeInteraction = (comment, userId, interactionType) => {
  const interactionInfo = comment.interactionInfo;

  let listName = getListName(interactionType);
  interactionInfo[listName] = interactionInfo[listName]?.filter(
    (x) => !x.equals(userId)
  );

  const newComment = {
    ...comment,
    interactionInfo,
  };

  return newComment;
};

/**
 * Check if a user can view a post
 * - if the post is group post. first check if the group if this post exists, return false if no. otherwise, check the group's privacy.
 * @param {any} post
 * @param {string | mongoose.Types.ObjectId} userId
 * @param {boolean=} allowedUnjoinedGroups
 * @returns {boolean}
 */
