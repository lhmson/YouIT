import express from "express";
import {
  isConversationSeenByUser,
  isMemberOfConversation,
  isOwnerOfConversation,
} from "../businessLogics/conversation.js";
import { isValidUser } from "../businessLogics/user.js";
import Conversation from "../models/conversation.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import { asyncFilter } from '../utils/asyncFilter.js'
import { cuteIO } from '../index.js'
import Message from "../models/message.js";

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const createConversation = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res
      .status(httpStatusCodes.unauthorized)
      .send("You must sign in to create a conversation");
  }

  const conversation = req.body;
  if (conversation._id) {
    return res
      .status(httpStatusCodes.badContent)
      .send("New conversation mustn't have _id field");
  }

  let { listMembers, listOwners } = conversation;
  listOwners = [...new Set(listOwners).add(userId)];
  listMembers = [...new Set(listMembers).add(userId)];
  conversation.title = conversation.title ?? "Untitled group";

  if (listMembers.length <= 1) {
    return res
      .status(httpStatusCodes.badContent)
      .send("A conversation should have at least 2 members");
  }

  try {
    const newConversation = new Conversation({
      ...conversation,
      listOwners,
      listMembers,
      messageUpdatedAt: Date.now(),
    });

    await newConversation.save();

    listMembers.forEach(memberId => cuteIO.sendToUser(memberId, "Message-conversationCreated", {
      res: {
        conversationId: newConversation._id,
        senderId: userId,
      }
    }));

    return res.status(httpStatusCodes.created).json(newConversation);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 * @deprecated It is suggested to use socket to add messages instead
 */
export const addMessage = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res
      .status(httpStatusCodes.unauthorized)
      .send("You must sign in to add a message");
  }

  const { conversationId } = req.params;

  const { message, socketId } = req.body;
  if (!message) {
    return res
      .status(httpStatusCodes.badContent)
      .send("Message field is required");
  }

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`There's no conversation with id ${conversationId}`);
    }

    const conversationObj = conversation.toObject();

    if (!isMemberOfConversation(userId, conversationObj)) {
      return res
        .status(httpStatusCodes.forbidden)
        .send(`You are not in this conversation`);
    }

    message.senderId = userId;
    if (conversationObj?.listMessages)
      conversationObj.listMessages.push(message);
    else conversationObj.listMessages = [message];

    Conversation.findByIdAndUpdate(conversationId, conversationObj, {
      new: true,
    }).then((newConversation) => {
      return res.status(httpStatusCodes.ok).json(newConversation);
    });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getAConversation = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res
      .status(httpStatusCodes.unauthorized)
      .send("You must sign in to get your conversation");
  }

  const { conversationId } = req.params;

  try {
    const conversation = await Conversation.findById(conversationId)
      .populate({
        path: `listMessages`,
        model: `Message`,
        populate: {
          path: `senderId`,
          select: `name`,
          model: `User`,
        },
      })
      .populate({
        path: `listMembers`,
        select: `name`,
        model: `User`,
      })
      .populate({
        path: `listSeenMembers`,
        select: `name`,
        model: `User`,
      });

    if (!conversation) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`There's no conversation with id ${conversationId}`);
    }

    const conversationObj = conversation.toObject();
    if (!isMemberOfConversation(userId, conversationObj)) {
      return res
        .status(httpStatusCodes.forbidden)
        .send(`You are not in this conversation`);
    }

    // pagination
    let msgStart = req.query.msgStart ?? 0;
    let msgEnd = req.query.msgEnd ?? 0;

    msgStart = parseInt(msgStart);
    msgEnd = parseInt(msgEnd);

    conversationObj.listMessages = conversationObj?.listMessages?.slice(
      msgStart,
      msgEnd + 1
    );

    return res.status(httpStatusCodes.ok).send(conversationObj);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getConversationsOfUser = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res
      .status(httpStatusCodes.unauthorized)
      .send("You must sign in to get your conversations");
  }

  const msgLimit = req.query.msgLimit ?? 1;
  const msgPage = req.query.msgPage ?? 0;
  const limit = req.query.limit ?? 1;
  const page = req.query.page ?? 0;

  try {
    await Conversation.find()
      .sort({ messageUpdatedAt: -1 })
      .populate({
        path: `listMessages`,
        model: `Message`,
        populate: {
          path: `senderId`,
          select: `name`,
          model: `User`,
        },
      })
      .populate({
        path: `listMembers`,
        select: `name`,
        model: `User`,
      })
      .exec()
      .then((conversations) => {
        const filteredConversation = conversations.filter((c) => isMemberOfConversation(userId, c))
        filteredConversation.forEach(c => {
          if (c.listMessages?.length > 0)
            c.listMessages.length = 1;
        }) // only fetch the first message for optimization

        res.status(httpStatusCodes.ok).send(filteredConversation);
      })
      .catch((error) => {
        return res
          .status(httpStatusCodes.internalServerError)
          .json({ message: error });
      });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getUnseenConversationIds = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res
      .status(httpStatusCodes.unauthorized)
      .send("You must sign in to get your conversations");
  }

  const result = [];

  try {
    const conversations = await Conversation.find();

    conversations.forEach((c) => {
      if (isMemberOfConversation(userId, c) && !isConversationSeenByUser(userId, c))
        result.push(c._id.toString());
    });

    return res.status(httpStatusCodes.ok).send(result);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
};


/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const updateConversation = async (req, res, next) => {
  const { userId } = req;
  const { conversationId } = req.params;
  const newConversationData = req.body;

  if (!userId) {
    return res
      .status(httpStatusCodes.unauthorized)
      .send("You must sign in to update your conversations");
  }

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation)
      return res
        .status(httpStatusCodes.notFound)
        .send(`No conversation with id ${conversationId}`);

    if (!isOwnerOfConversation(userId, conversation))
      return res
        .status(httpStatusCodes.forbidden)
        .send("You are not a conversation owner");

    const newConversation = conversation.toObject();

    if (newConversationData.listMembers) {
      // check if each user is cool
      newConversationData.listMembers = await asyncFilter(newConversationData.listMembers, isValidUser);
      newConversation.listMembers = [...new Set([
        ...newConversationData.listMembers,
        ...newConversation.listOwners?.map(userId => userId?.toString())
      ])];

      if (newConversation.listMembers.length < 2) {
        return res.status(httpStatusCodes.badContent).send("A conversation must have at least 2 members. Consider remove conversation instead");
      }
    }

    if (newConversationData.title) {
      if (newConversationData.title === "")
        return res.status(httpStatusCodes.badContent).send("The title must not be empty");
      newConversation.title = newConversationData.title;
    }

    const receivers = [...new Set([
      ...newConversation.listMembers,
      ...conversation.listMembers?.map(userId => userId?.toString())
    ])];

    const updatedConversation = await Conversation.findByIdAndUpdate(conversationId, newConversation, { new: true });

    receivers.forEach(memberId => cuteIO.sendToUser(memberId, "Message-conversationUpdated", {
      res: {
        conversationId,
        senderId: userId,
      }
    }));

    return res.status(httpStatusCodes.ok).send(updatedConversation);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
}


/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const deleteConversation = async (req, res, next) => {
  const { userId } = req;
  const { conversationId } = req.params;

  if (!userId) {
    return res
      .status(httpStatusCodes.unauthorized)
      .send("You must sign in to delete your conversations");
  }

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation)
      return res
        .status(httpStatusCodes.notFound)
        .send(`No conversation with id ${conversationId}`);

    if (!isOwnerOfConversation(userId, conversation))
      return res
        .status(httpStatusCodes.forbidden)
        .send("You are not a conversation owner");

    conversation.listMembers?.forEach(memberId => cuteIO.sendToUser(memberId.toString(), "Message-conversationDeleted", {
      res: {
        conversationId,
        senderId: userId,
      }
    }));

    await Conversation.findByIdAndDelete(conversationId);
    return res.status(httpStatusCodes.ok).send(`Conversation deleted successfully`);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
}


/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const deleteMessage = async (req, res, next) => {
  const { userId } = req;
  const { conversationId, messageId } = req.params;

  if (!userId) {
    return res
      .status(httpStatusCodes.unauthorized)
      .send("You must sign in to delete your conversations");
  }

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation)
      return res
        .status(httpStatusCodes.notFound)
        .send(`No conversation with id ${conversationId}`);

    const oldListLength = conversation?.listMessages?.length;
    conversation.listMessages = conversation?.listMessages?.filter(msgId => !msgId.equals(messageId));

    if (oldListLength <= conversation?.listMessages?.length)
      return res
        .status(httpStatusCodes.notFound)
        .send(`No message with id ${messageId} in a conversation with id ${conversationId}`);


    const message = await Message.findById(messageId);

    if (!message)
      return res
        .status(httpStatusCodes.notFound)
        .send(`No message with id ${messageId}`);

    if (!message?.senderId?.equals(userId))
      return res
        .status(httpStatusCodes.forbidden)
        .send(`Cannot delete others' messages`);

    await Conversation.findByIdAndUpdate(conversationId, conversation);
    await Message.findByIdAndDelete(messageId);

    conversation?.listMembers?.forEach(memberId => cuteIO.sendToUser(memberId.toString(), "Message-remove", {
      res: {
        conversationId,
        messageId,
        senderId: userId,
      }
    }));

    return res
      .status(httpStatusCodes.ok)
      .send(`Deleted successfully`);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
}