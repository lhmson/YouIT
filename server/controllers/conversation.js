import express from 'express'
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

  const { listMembers, listOwners } = conversation;

  try {
    const newConversation = new Conversation({
      ...conversation,
      listOwners: [...new Set(listOwners).add(userId)],
      listMembers: [...new Set(listMembers).add(userId)],
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
 */
export const addMessage = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res.status(httpStatusCodes.unauthorized).send("You must sign in to add a message");
  }

  const { conversationId } = req.params;

  const { message } = req.body;
  if (!message) {
    return res.status(httpStatusCodes.badContent).send("Message field is required");
  }

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(httpStatusCodes.notFound).send(`There's no conversation with id ${conversationId}`);
    }

    const conversationObj = conversation.toObject();
    if (conversationObj?.listMessages)
      conversationObj.listMessages.push(message);
    else
      conversationObj.listMessages = [message];

    Conversation.findByIdAndUpdate(conversationId, conversationObj).then(
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