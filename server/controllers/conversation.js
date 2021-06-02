import express from 'express'
import { isMemberOfConversation } from '../businessLogics/conversation.js';
import Conversation from '../models/conversation.js';
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
      });

    if (!conversation) {
      return res.status(httpStatusCodes.notFound).send(`There's no conversation with id ${conversationId}`);
    }

    const conversationObj = conversation.toObject();
    if (!isMemberOfConversation(userId, conversationObj)) {
      return res.status(httpStatusCodes.forbidden).send(`You are not in this conversation`);
    }

    // pagination
    const msgLimit = req.query.msgLimit ?? 1;
    conversationObj.listMessages =
      conversationObj?.listMessages?.slice?.(Math.max(0, conversationObj?.listMessages?.length - msgLimit), conversationObj?.listMessages?.length);

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

  try {
    await Conversation
      .find()
      .sort({ 'updatedAt': -1 })
      .populate({
        path: `listMessages`,
        model: `Message`,
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