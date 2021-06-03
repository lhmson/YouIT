import express from 'express'
import { isConversationSeenByUser, isMemberOfConversation } from '../businessLogics/conversation.js';
import Conversation from '../models/conversation.js';
import { customPagination } from '../utils/customPagination.js';
import { httpStatusCodes } from '../utils/httpStatusCode.js';

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const createConversation = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res.status(httpStatusCodes.unauthorized).send("You must sign in to create a conversation");
  }

  const conversation = req.body;
  if (conversation._id) {
    return res.status(httpStatusCodes.badContent).send("New conversation mustn't have _id field");
  }

  let { listMembers, listOwners } = conversation;
  listOwners = [...new Set(listOwners).add(userId)];
  listMembers = [...new Set(listMembers).add(userId)];
  conversation.title = conversation.title ?? "Untitled group";

  if (listMembers.length <= 1) {
    return res.status(httpStatusCodes.badContent).send("A conversation should have at least 2 members");
  }

  try {
    const newConversation = new Conversation({
      ...conversation,
      listOwners,
      listMembers,
    });

    await newConversation.save();
    return res.status(httpStatusCodes.created).json(newConversation);
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
 * @deprecated It is suggested to use socket to add messages instead
 */
export const addMessage = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res.status(httpStatusCodes.unauthorized).send("You must sign in to add a message");
  }

  const { conversationId } = req.params;

  const { message, socketId } = req.body;
  if (!message) {
    return res.status(httpStatusCodes.badContent).send("Message field is required");
  }

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(httpStatusCodes.notFound).send(`There's no conversation with id ${conversationId}`);
    }

    const conversationObj = conversation.toObject();

    if (!isMemberOfConversation(userId, conversationObj)) {
      return res.status(httpStatusCodes.forbidden).send(`You are not in this conversation`);
    }

    message.senderId = userId;
    if (conversationObj?.listMessages)
      conversationObj.listMessages.push(message);
    else
      conversationObj.listMessages = [message];

    Conversation.findByIdAndUpdate(conversationId, conversationObj, { new: true }).then(
      (newConversation) => {
        return res.status(httpStatusCodes.ok).json(newConversation);
      }
    )
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
export const getAConversation = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res.status(httpStatusCodes.unauthorized).send("You must sign in to get your conversation");
  }

  const { conversationId } = req.params;

  try {
    const conversation = await Conversation
      .findById(conversationId)
      .populate({
        path: `listMessages`,
        model: `Message`,
        populate: {
          path: `senderId`,
          select: `name`,
          model: `User`
        }
      })
      .populate({
        path: `listMembers`,
        select: `name`,
        model: `User`,
      });

    if (!conversation) {
      return res.status(httpStatusCodes.notFound).send(`There's no conversation with id ${conversationId}`);
    }

    const conversationObj = conversation.toObject();
    if (!isMemberOfConversation(userId, conversationObj)) {
      return res.status(httpStatusCodes.forbidden).send(`You are not in this conversation`);
    }

    // pagination
    let msgStart = req.query.msgStart ?? 0;
    let msgEnd = req.query.msgEnd ?? 0;

    msgStart = parseInt(msgStart);
    msgEnd = parseInt(msgEnd);

    conversationObj.listMessages = conversationObj?.listMessages?.slice(msgStart, msgEnd + 1);

    return res.status(httpStatusCodes.ok).send(conversationObj);
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
export const getConversationsOfUser = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res.status(httpStatusCodes.unauthorized).send("You must sign in to get your conversations");
  }

  const msgLimit = req.query.msgLimit ?? 1;
  const msgPage = req.query.msgPage ?? 0;
  const limit = req.query.limit ?? 1;
  const page = req.query.page ?? 0;

  try {
    await Conversation
      .find()
      .sort({ 'updatedAt': -1 })
      .populate({
        path: `listMessages`,
        model: `Message`,
        populate: {
          path: `senderId`,
          select: `name`,
          model: `User`
        }
      })
      .populate({
        path: `listMembers`,
        select: `name`,
        model: `User`,
      })
      .exec()
      .then((conversations) => {
        const conversationObjs = conversations.map(c => c.toObject())
          .filter(c => isMemberOfConversation(userId, c))

        res.status(httpStatusCodes.ok).send(conversationObjs);
      })
      .catch((error) => {
        return res
          .status(httpStatusCodes.internalServerError)
          .json({ message: error });
      })
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
export const getUnseenConversationIds = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res.status(httpStatusCodes.unauthorized).send("You must sign in to get your conversations");
  }

  const result = [];

  try {
    const conversations = await Conversation.find();

    conversations.forEach(c => {
      if (!isConversationSeenByUser(userId, c))
        result.push(c._id.toString());
    })

    return res.status(httpStatusCodes.ok).send(result);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error });
  }
}