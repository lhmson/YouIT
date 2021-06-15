import express from "express";
import mongoose from "mongoose";
import {
  addInteraction,
  getInteractionOfAUser,
  isPostUpdated,
  isPostVisibleByUser,
  removeInteraction,
} from "../businessLogics/post.js";

import Post from "../models/post.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import { sendNotificationUser } from "../businessLogics/notification.js";
import User from "../models/user.js";
import Group from "../models/group.js";
import { asyncFilter } from "../utils/asyncFilter.js";
import { customPagination } from "../utils/customPagination.js";
import { isMemberOfGroup, getMemberRoleInGroup, checkRoleHasPermissionOfRole } from "../businessLogics/group.js";
import moment from "moment";

//#region CRUD
// GET post/list/all
/** @deprecated */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(httpStatusCodes.ok).json(posts);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// GET post/:id
export const getAPost = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    await Post.findById(id)
      .populate("userId", "name avatarUrl") // need to populate more item (avatar, )
      .populate({
        path: "groupPostInfo.groupId",
        select: "name",
        model: "Group",
      })
      .then((post) => {
        const postObj = post.toObject();

        isPostVisibleByUser(
          { ...postObj, userId: postObj.userId._id },
          userId
        ).then(visible => {
          if (visible)
            return res.status(200).json(post);
          else
            return res
              .status(httpStatusCodes.forbidden)
              .json(
                "You don't have permission to access this post due to its privacy"
              );
        }).catch(err => {
          return res
            .status(404)
            .json({ message: `Cannot find a post with id: ${id}`, error: err });
        })
      })
      .catch((err) => {
        return res
          .status(404)
          .json({ message: `Cannot find a post with id: ${id}`, error: err });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const createPost = async (req, res) => {
  const post = req.body;
  const { userId } = req;

  // new post shouldn't have an _id in it
  if (post._id) {
    return res.status(400).json("New post mustn't have _id field");
  }

  let group = null;
  let roleInGroup = null;

  // handle post in group
  if (post.privacy === "Group") {
    const { groupId } = post;

    if (!groupId)
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: `Field groupId is required when privacy is "Group"` });

    group = await Group.findById(groupId);
    if (!group)
      return res
        .status(httpStatusCodes.notFound)
        .send({ message: `Cannot find group with group ID = ${groupId}` });

    if (!isMemberOfGroup(req.userId, group.toObject()))
      return res
        .status(httpStatusCodes.forbidden)
        .send({ message: `You are not in this group` });

    roleInGroup = getMemberRoleInGroup(userId, group)

    post.groupPostInfo = {
      groupId,
      status: checkRoleHasPermissionOfRole(roleInGroup, "Moderator")
        ? "Approved" : "Pending",
    };
  }
  delete post.groupId;

  const newPost = new Post({
    ...post,
    userId: req.userId,
    contentUpdatedAt: Date.now(),
  });

  try {
    await newPost.save();

    // send review notification to mod of Group posts
    if (post.privacy === "Group") {
      if (!checkRoleHasPermissionOfRole(roleInGroup, "Moderator")) {
        group?.listMembers?.forEach(member => {
          if (checkRoleHasPermissionOfRole(member?.role, "Moderator"))
            sendNotificationUser({
              userId: member?.userId,
              kind: "NewGroupPost_GroupModerator",
              content: {
                description: `A new post "${newPost?.title}" has been uploaded to your group "${group.name}". Click here to review it.`,
              },
              link: `/post/${newPost?._id}`,
            });
        })
      }
    }

    return res.status(httpStatusCodes.created).json(newPost);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// PUT post/:id
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const newPost = req.body;

    if (!newPost)
      return res
        .status(httpStatusCodes.badContent)
        .send(`New post information is required`);

    const post = (await Post.findById(id)).toObject();
    if (!post)
      return res
        .status(httpStatusCodes.notFound)
        .send(`Cannot find a post with id: ${id}`);

    if (!userId || !post.userId.equals(userId)) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: `You don't have permission to edit this post` });
    }

    const updatedPost = {
      ...post,
      ...newPost,
    };

    // resetting group post status
    let group = null;
    let roleInGroup = null;

    if (post.privacy === "Group") {
      group = await Group.findById(post.groupPostInfo.groupId);
      roleInGroup = getMemberRoleInGroup(userId, group)

      post.groupPostInfo.status =
        checkRoleHasPermissionOfRole(roleInGroup, "Moderator")
          ? "Approved" : "Pending";
    }

    if (isPostUpdated(post, updatedPost)) {
      updatedPost.contentUpdatedAt = Date.now();
    }

    await Post.findByIdAndUpdate(id, updatedPost, { new: true }).then((res) => {
      // send review notification to mod of Group posts
      if (res?.privacy === "Group") {
        if (!checkRoleHasPermissionOfRole(roleInGroup, "Moderator")) {
          group?.listMembers?.forEach(member => {
            if (checkRoleHasPermissionOfRole(member?.role, "Moderator"))
              sendNotificationUser({
                userId: member?.userId,
                kind: "UpdatedGroupPost_GroupModerator",
                content: {
                  description: `The post "${res?.title}" in your group "${group.name}" has been updated. Click here to review it.`,
                },
                link: `/post/${res?._id}`,
              });
          })
        }
      }

      const groupPostNote = (res?.privacy === "Group" && res?.groupPostInfo?.status === "Pending") ?
        " It may be under review for a while." : "";

      res?.interactionInfo?.listUsersFollowing?.forEach((item, i) => {
        isPostVisibleByUser(updatedPost, userId).then(visible => {
          if (visible) {
            // edit privacy to friend handle
            if (!item.equals(userId)) {
              sendNotificationUser({
                userId: item,
                kind: "UpdatePost_PostFollowers",
                content: {
                  description: `Post '${res?.title}' that you are following has been edited.` + groupPostNote,
                },
                link: `/post/${res?._id}`,
              });
            }
          }
        });
      });
    })
    return res.status(httpStatusCodes.ok).json(updatedPost);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// DELETE post/:id
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    // auth
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`No post with id: ${id}`);
    }

    if (!userId || !post.userId.equals(userId)) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: `You don't have permission to delete this post` });
    }

    await Post.findByIdAndRemove(id);
    res
      .status(httpStatusCodes.ok)
      .json({ message: "Post deleted successfully." });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////

//#region post interactions
export const getMyPostInteractions = async (req, res) => {
  const { id } = req.params;
  const { filter } = req.query;

  try {
    // auth
    const { userId } = req;
    if (!userId) {
      return res.json({ message: "Unauthenticated" });
    }

    let filterJson = undefined;
    try {
      filterJson = JSON.parse(filter);
    } catch {}

    const interactions = await getInteractionOfAUser(id, userId, filterJson);
    return res.status(httpStatusCodes.ok).json(interactions);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// currying function for different type of adding interaction, such as: upvote, downvote, follow, hide
/**
 * @param {[{actionType: "add"|"remove", interactionType: "upvote"|"downvote"|"react"|"hide"|"follow"}]} actions
 */
const handleUpdateInteraction = (actions) => async (req, res) => {
  const { id } = req.params;

  try {
    // auth
    const { userId } = req;
    if (!userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(httpStatusCodes.badContent)
        .send(`post id ${id} is invalid`);

    // user who act
    const user = await User.findById(userId);

    const post = await Post.findById(id);
    if (!post)
      return res
        .status(httpStatusCodes.notFound)
        .json(`Cannot find a post with id: ${id}`);

    let newPost = { ...post.toObject() };

    actions.forEach((a) => {
      switch (a.actionType) {
        case "add":
          newPost = addInteraction(newPost, userId, a.interactionType);

          // Test socket.io
          if (a.interactionType === "upvote") {
            if (!newPost.userId.equals(userId)) {
              sendNotificationUser({
                userId: newPost.userId.toString(),
                kind: "UpvotePost_PostOwner",
                content: {
                  description: `${user?.name} has upvoted your post named ${newPost?.title}`,
                },
                link: `/post/${newPost._id}`,
              });
            }
          }

          break;
        case "remove":
          newPost = removeInteraction(newPost, userId, a.interactionType);
          break;
      }
    });

    newPost = await Post.findByIdAndUpdate(id, newPost, { new: true });
    return res.status(httpStatusCodes.ok).json(newPost);
  } catch (error) {
    // return res.status(httpStatusCodes.internalServerError).json({ message: error.message });
    throw error;
  }
};

export const unvotePost = handleUpdateInteraction([
  { actionType: "remove", interactionType: "upvote" },
  { actionType: "remove", interactionType: "downvote" },
]);

export const upvotePost = handleUpdateInteraction([
  { actionType: "remove", interactionType: "downvote" },
  { actionType: "add", interactionType: "upvote" },
]);

export const downvotePost = handleUpdateInteraction([
  { actionType: "remove", interactionType: "upvote" },
  { actionType: "add", interactionType: "downvote" },
]);

export const hidePost = handleUpdateInteraction([
  { actionType: "add", interactionType: "hide" },
]);

export const unhidePost = handleUpdateInteraction([
  { actionType: "remove", interactionType: "hide" },
]);

export const followPost = handleUpdateInteraction([
  { actionType: "add", interactionType: "follow" },
]);

export const unfollowPost = handleUpdateInteraction([
  { actionType: "remove", interactionType: "follow" },
]);
//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////

export const getPostsPagination = async (req, res) => {
  const { userId } = req;

  //get _page and _limit params from url
  // joinedGroupOnly: cut out the posts of group of which this user is not a member
  /** @type {{space: "news_feed"|"user_profile"|"pending_in_group"|"group", help: boolean}} */
  let { _page, _limit, ownerId, groupId, space, help } = req.query;
  if (_page) _page = parseInt(_page);
  else _page = 0;
  if (_limit) _limit = parseInt(_limit);
  else _limit = 100; // sorry for the magic :)

  space = space?.toLowerCase();

  // joinedGroupOnly = joinedGroupOnly?.toUpperCase() === "TRUE";
  // profileWallOnly = profileWallOnly?.toUpperCase() === "TRUE";

  if (help !== undefined) {
    return res
      .status(httpStatusCodes.ok)
      .send(
        `space query:\n` +
        ` - (empty): All visible posts\n` +
        ` - news_feed: All posts from other users and posts in joined group\n` +
        ` - user_profile: All posts of a user which are not in group (ownerId query is required)\n` +
        ` - pending_in_group: All posts that's currently pending in a group (groupId query is required)\n` +
        ` - group: All approved posts in the same group (groupId query is required)\n` +
        `\n` +
        `ownerId query: Filter out all posts of just 1 user\n` +
        `groupId query: Filter out all posts of just 1 group\n`
      );
  }

  if ((space === "group" || space === "pending_in_group") && !groupId)
    return res
      .status(httpStatusCodes.badContent)
      .send(`groupId query is required when space is ${space}`);

  if (space === "user_profile" && !ownerId)
    return res
      .status(httpStatusCodes.badContent)
      .send(`ownerId query is required when space is ${space}`);

  try {
    await Post.find()
      .populate("userId", "name avatarUrl")
      .populate({
        path: "groupPostInfo.groupId",
        select: "name",
        model: "Group",
      })
      .sort({ createdAt: -1 })
      // .skip(_page > 0 ? _page * _limit : 0)
      // .limit(_limit) // because the last filter would filter out even more element :)
      .then((rawPosts) => {
        const posts = rawPosts.map((p) => p.toObject());

        asyncFilter(posts, async (p) => {
          /** unpopulate userId */
          const stdPostObj = {
            ...p,
            userId: p.userId._id,
          };
          let visible = await isPostVisibleByUser(stdPostObj, userId);

          if (!visible) return false;

          if (groupId)
            if (!stdPostObj?.groupPostInfo?.groupId?._id.equals(groupId))
              return false;

          if (ownerId) if (!stdPostObj.userId.equals(ownerId)) return false;

          if (stdPostObj.privacy === "Group") {
            switch (space) {
              case "user_profile": {
                return false;
              }
              case "news_feed": {
                const group = await Group.findById(
                  stdPostObj?.groupPostInfo?.groupId
                );
                if (!group) return false;
                if (stdPostObj?.groupPostInfo?.status !== "Approved")
                  return false;

                if (!isMemberOfGroup(userId, group)) return false;
                break;
              }
              case "pending_in_group": {
                if (!groupId) return false;
                if (stdPostObj?.groupPostInfo?.status !== "Pending")
                  return false;
                break;
              }
              case "group": {
                if (!groupId) return false;
                if (stdPostObj?.groupPostInfo?.status !== "Approved")
                  return false;
                break;
              }
            }
          } else {
            switch (space) {
              case "user_profile": {
                if (!ownerId) return false;
                break;
              }
              case "news_feed": {
                break;
              }
              case "pending_in_group": {
                return false;
              }
              case "group": {
                return false;
              }
            }
          }

          return true;
        }).then((filteredPosts) => {
          return res
            .status(200)
            .send(customPagination(filteredPosts, _limit, _page));
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: `Cannot get posts`, error: err });
      });

    // const filteredPosts = [];
    // posts.forEach(p => {

    // });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getOtherPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const excludedPost = await Post.findById(id);
    if (!excludedPost) {
      res.status(404).json("Invalid ID");
      return;
    }
    const posts = await (await Post.find())
      .filter(
        (p) =>
          p.userId?.toString() === excludedPost?.userId.toString() &&
          p._id.toString() !== excludedPost._id.toString()
      )
      .slice(0, 5);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const canReviewGroupPost = async (req, res, next) => {
  const { userId } = req;
  const { postId } = req.params;

  if (!userId)
    return res.status(httpStatusCodes.unauthorized).send("You have to sign in to review a post");

  try {
    const post = await Post.findById(postId);

    if (!post)
      return res
        .status(httpStatusCodes.notFound)
        .send(`Cannot find a post with id: ${postId}`);

    const { groupId } = post.groupPostInfo ?? {};

    if (post.privacy !== "Group" || !groupId)
      return res
        .status(httpStatusCodes.badContent)
        .send(`Not a group post`);

    const group = await Group.findById(groupId);

    if (!group)
      return res
        .status(httpStatusCodes.notFound)
        .send("The group of this post does not exist");

    const userRole = getMemberRoleInGroup(userId, group);
    if (!checkRoleHasPermissionOfRole(userRole, "Moderator"))
      return res
        .status(httpStatusCodes.forbidden)
        .send("You don't have permission to review this post due to your role or you're not in this group");

    req.groupPost = {
      post,
      group,
    }

    return next?.();
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
}

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const approveGroupPost = async (req, res, next) => {
  try {
    const { post, group } = req.groupPost;
    const { postId } = req.params;

    if (post.groupPostInfo.status === "Approved")
      return res
        .status(httpStatusCodes.badContent)
        .send("This post has already been approved")

    post.groupPostInfo.status = "Approved";
    const newPost = await Post.findByIdAndUpdate(postId, post, { new: true });

    sendNotificationUser({
      userId: post?.userId?.toString(),
      kind: "ApprovedPost_PostOwner",
      content: {
        description: `Your post "${post?.title}" in group "${group?.name}" has been approved.`,
      },
      link: `/post/${post?._id}`,
    });

    return res
      .status(httpStatusCodes.ok)
      .send(newPost);

  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
}

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const declineGroupPost = async (req, res, next) => {
  try {
    const { post, group } = req.groupPost;
    const { postId } = req.params;

    const backUpContent = post?.toObject?.()?.content;
    delete backUpContent.createdAt;
    delete backUpContent.updatedAt;
    delete backUpContent._id;

    await Post.findByIdAndDelete(postId);

    sendNotificationUser({
      userId: post?.userId?.toString(),
      kind: "DeclinedPost_PostOwner",
      content: {
        description: `Your post "${post?.title}" in group "${group?.name}" has been declined.`,
        postBackUp: backUpContent,
      },
      link: `/?postBackUp=${JSON.stringify(backUpContent)}`,
    });

    return res
      .status(httpStatusCodes.ok)
      .send("Post declined and deleted");

  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
}

export const countPosts = async (req, res) => {
  const { range, timeString } = req.params;
  let time = moment(timeString);
  let labels = [];
  let wallPosts = [];
  let groupPosts = [];
  const countGroup = async (start, end) => {
    const count = await Post.find({
      createdAt: { $gt: start, $lte: end },
      privacy: "Group",
    }).count();
    groupPosts.push(count);
  };
  const countWall = async (start, end) => {
    const count = await Post.find({
      createdAt: { $gt: start, $lte: end },
      privacy: { $ne: "Group" },
    }).count();
    wallPosts.push(count);
  };
  const addData = async (time, unit) => {
    const start = time.clone().startOf(unit);
    const end = time.clone().endOf(unit);
    await countGroup(start, end);
    await countWall(start, end);
  };
  try {
    switch (range) {
      case "week":
        labels = moment.weekdaysShort();
        for (let i = 0; i < labels.length; i++) {
          let temp = time.clone().set("day", i);
          await addData(temp, "day");
        }
        break;
      case "month":
        for (let i = 0; i < time.daysInMonth(); i++) {
          labels.push(i + 1);
          let temp = time.clone().set("date", i);
          await addData(temp, "day");
        }
        break;
      case "year":
        labels = moment.monthsShort();
        for (let i = 0; i < labels.length; i++) {
          let temp = time.clone().set("month", i);
          await addData(temp, "month");
        }
        break;
    }
    res.status(200).json({ labels, wallPosts, groupPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
