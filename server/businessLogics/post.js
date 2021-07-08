import mongoose from "mongoose";
import Group from "../models/group.js";
import Post from "../models/post.js";
import { isMemberOfGroup } from "./group.js";
import { getRelationship } from "./user.js";

/**
 * [immutable function] Return an object showing user's interaction with a post
 * @param {mongoose.Document|String} post a post to check :) can be either mongoose document or objectId
 * @param {mongoose.Types.ObjectId|String} userId a user to check, but I prefer Id :)
 * @param {[("upvote"|"downvote"|"react"|"hide"|"follow")]} interactionType filter out the wanted interaction type. Get all by default
 * @returns {object} An object, whose properties indicate how a user interact with a post
 */
export const getInteractionOfAUser = async (post, userId, interactionType) => {
  // cast post into mongoose document type :)
  const postDoc = typeof post === "string" ? await Post.findById(post) : post;

  // cast userId into mongoose id type :)
  const userObjId = new mongoose.Types.ObjectId(userId);

  const result = {
    userId: userObjId,
    postId: postDoc._id,
  };

  // CuteTN Note: only user operator '==' to check for both null and undefine
  if (!interactionType || !Array.isArray(interactionType))
    interactionType = ["upvote", "downvote", "hide", "follow", "react"];

  interactionType.forEach?.((type) => {
    // except for react
    if (type === "react") return;

    const listName = getListName(type);
    result[type] =
      postDoc.interactionInfo[listName]?.find((u) => userObjId.equals(u)) !=
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
export const addInteraction = (post, userId, interactionType, reaction) => {
  const interactionInfo = post.interactionInfo;

  let listName = getListName(interactionType);
  interactionInfo[listName] = addIfNotExist(
    interactionInfo[listName],
    new mongoose.Types.ObjectId(userId)
  );

  const newPost = {
    ...post,
    interactionInfo,
  };

  return newPost;
};

/**
 * [Immutable function] Returns a new post with user interaction removed
 * @param {mongoose.Document} post
 * @param {mongoose.Types.ObjectId} userId
 * @param {"upvote"|"downvote"|"react"|"hide"|"follow"} interactionType
 * @return {mongoose.Document}
 */
export const removeInteraction = (post, userId, interactionType) => {
  const interactionInfo = post.interactionInfo;

  let listName = getListName(interactionType);
  interactionInfo[listName] = interactionInfo[listName]?.filter(
    (x) => !x.equals(userId)
  );

  const newPost = {
    ...post,
    interactionInfo,
  };

  return newPost;
};

/**
 * Check if a user can view a post
 * - if the post is group post. first check if the group if this post exists, return false if no. otherwise, check the group's privacy.
 * @param {any} post
 * @param {string | mongoose.Types.ObjectId} userId
 * @param {boolean=} allowedUnjoinedGroups
 * @returns {Promise<boolean>}
 */
export const isPostVisibleByUser = async (post, userId) => {
  const postOwnerId = post.userId?._id ?? post.userId;

  if (post.privacy === "Group") {
    const group = await Group.findById(post?.groupPostInfo?.groupId);

    if (!group) return false;

    if (post?.groupPostInfo?.status !== "Approved") {
      // the user can still see post from herself/himself even if it's not approved
      if (postOwnerId?.equals(userId)) return true; //TODO: review null

      // only group moderator, admin and owner can see this post
      // Gonna refactor later: use function in bussiness logic / group
      const userRoleInGroup = group?.listMembers?.find((member) =>
        member?.userId?.equals(userId)
      )?.role;
      if (
        userRoleInGroup === "Moderator" ||
        userRoleInGroup === "Admin" ||
        userRoleInGroup === "Owner"
      )
        return true;

      return false;
    }

    if (group.privacy === "Public") return true;
    else return isMemberOfGroup(userId, group);
  }

  const rela = await getRelationship(userId, postOwnerId);
  switch (post.privacy) {
    case "Public":
      return true;
    case "Friend":
      return rela === "Friend" || rela === "Self";
    case "Private":
      return rela === "Self";
  }

  return false;
};

export const isPostUpdated = (oldPost, updatedPost) => {
  if (oldPost.title !== updatedPost.title) {
    return true;
  }
  if (oldPost.content?.text !== updatedPost.content?.text) {
    return true;
  }
  if (oldPost.content.pinnedUrl !== updatedPost.content.pinnedUrl) {
    return true;
  }
  if (oldPost.content.overview !== updatedPost.content.overview) {
    return true;
  }
  if (oldPost.privacy !== updatedPost.privacy) {
    return true;
  }

  return false;
};
