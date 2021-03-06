import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";

import { httpStatusCodes } from "../utils/httpStatusCode.js";

import {
  addInteraction,
  getInteractionOfAUser,
  removeInteraction,
} from "../businessLogics/comment.js";

import { sendNotificationUser } from "../businessLogics/notification.js";
import { isPostVisibleByUser } from "../businessLogics/post.js";

export const createComment = async (req, res) => {
  const { postId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).send(`Id ${postId} is invalid.`);
  }
  const comment = new Comment({ ...req.body, contentUpdatedAt: Date.now() });
  comment.userId = req.userId;

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(httpStatusCodes.notFound).send("User not found.");
  }

  await comment.save();
  try {
    await Post.findById(postId)
      .then(async (post) => {
        if (!post)
          return res.status(httpStatusCodes.notFound).send("Post not found.");

        post.comments.push(comment._id);
        await post.save();

        if (!post.userId?.equals(req.userId)) {
          sendNotificationUser({
            userId: post.userId,
            kind: "CommentToPost_PostOwner",
            content: {
              description: `${user.name} has just commented on your post "${post.title}".`,
            },
            link: `/post/${post?._id}/${comment._id}`,
          });
        }

        post?.interactionInfo?.listUsersFollowing?.forEach((followerId) => {
          isPostVisibleByUser(post, followerId).then((visible) => {
            if (visible) {
              if (!followerId.equals(req.userId)) {
                sendNotificationUser({
                  userId: followerId,
                  kind: "CommentToPost_PostFollowers",
                  content: {
                    description: `${user.name} has just commented on the post "${post.title}" that you followed.`,
                  },
                  link: `/post/${post?._id}/${comment._id}`,
                });
              }
            }
          });
        });

        post.inter;

        res.status(201).json(post);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const replyComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { userId } = req;
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(httpStatusCodes.notFound).send("User not found.");
    }

    const comment = new Comment(req.body);
    comment.userId = userId;
    comment.quotedCommentId = commentId;
    if (!comment) return res.status(400).json({ message: err.message });
    await comment.save();

    await Post.findById(postId)
      .then(async (post) => {
        post.comments.push(comment._id);
        await post.save();

        if (comment.quotedCommentId) {
          const quotedComment = await Comment.findById(comment.quotedCommentId);
          const quotedUserId = quotedComment?.userId;
          if (quotedUserId) {
            if (!quotedUserId.equals(req.userId)) {
              sendNotificationUser({
                userId: quotedUserId,
                kind: "ReplyToComment_OriginalCommentOwner",
                content: {
                  description: `${user.name} has just replied to your comment in post "${post.title}".`,
                },
                link: `/post/${post?._id}/${comment._id}`,
              });
            }
          }
        }

        res.status(201).json(comment);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  } catch (error) { }
};

export const getComments = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send(`Id ${id} is invalid.`);
  }
  Post.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "name avatarUrl userInfo",
      },
    })
    .populate({
      path: "comments",
      populate: {
        path: "quotedCommentId",
        populate: {
          path: "userId",
          select: "name avatarUrl",
        },
      },
    })
    .then(
      (post) => {
        // console.log(post.comments.length);
        if (!post) res.status(404).send("Post not found");
        else {
          post.comments.map((c) => {
            if (c.quotedCommentId === null)
              console.log("null quoted comment", c);
          });
          res.status(200).json(post.comments);
        }
      },
      (err) => {
        res.status(500).json({ message: err.message });
      }
    );
};

export const getCommentsNumber = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send(`Id ${id} is invalid.`);
  }
  Post.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "quotedCommentId",
        populate: {
          path: "userId",
          select: "name avatarUrl",
        },
      },
    })
    .then(
      (post) => {
        // console.log(post.comments.length);
        const commentsNumber = post.comments.length;
        // post.comments.map((c) => {
        //   if (c.quotedCommentId === null) commentsNumber = commentsNumber - 1;
        // });
        res.status(200).json(commentsNumber);
        // res.status(200).json(post);
      },
      (err) => {
        res.status(500).json({ message: err.message });
      }
    );
};

export const editComment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    if (!userId) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "Unauthenticated" });
    }
    await Comment.findByIdAndUpdate(
      id,
      {
        content: req.body.content,
        contentUpdatedAt: Date.now(),
      },
      { new: true }
    )
      .then((comment) => {
        return res.status(200).json(comment);
      })
      .catch((err) => {
        return res.status(404).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    if (!userId) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "Unauthenticated" });
    }
    await Comment.findByIdAndDelete(id)
      .then((comment) => {
        return res.status(200).json(comment);
      })
      .catch((err) => {
        return res.status(404).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCommentInteractions = async (req, res) => {
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
    } catch { }

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
const handleUpdateCommentInteraction = (actions) => async (req, res) => {
  const { postId, id } = req.params;

  try {
    // auth
    const { userId } = req;
    if (!userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(httpStatusCodes.badContent)
        .send(`comment id ${id} is invalid`);

    // user who act
    const user = await User.findById(userId);

    const comment = await Comment.findById(id);
    if (!comment)
      return res
        .status(httpStatusCodes.notFound)
        .json(`Cannot find a comment with id: ${id}`);

    let newComment = { ...comment.toObject() };

    actions.forEach((a) => {
      switch (a.actionType) {
        case "add":
          newComment = addInteraction(newComment, userId, a.interactionType);

          if (a.interactionType === "upvote") {
            if (!newComment.userId.equals(userId)) {
              sendNotificationUser({
                userId: newComment.userId.toString(),
                kind: "UpvotePost_PostOwner",
                content: {
                  description: `${user?.name} has upvoted your comment.`,
                },
                link: `/post/${postId}/${newComment._id}`,
              });
            }
          }

          break;
        case "remove":
          newComment = removeInteraction(newComment, userId, a.interactionType);
          break;
      }
    });

    newComment = await Comment.findByIdAndUpdate(id, newComment, { new: true });
    return res.status(httpStatusCodes.ok).json(newComment);
  } catch (error) {
    // return res.status(httpStatusCodes.internalServerError).json({ message: error.message });
    throw error;
  }
};

export const unvoteComment = handleUpdateCommentInteraction([
  { actionType: "remove", interactionType: "upvote" },
  { actionType: "remove", interactionType: "downvote" },
]);

export const upvoteComment = handleUpdateCommentInteraction([
  { actionType: "remove", interactionType: "downvote" },
  { actionType: "add", interactionType: "upvote" },
]);

export const downvoteComment = handleUpdateCommentInteraction([
  { actionType: "remove", interactionType: "upvote" },
  { actionType: "add", interactionType: "downvote" },
]);
