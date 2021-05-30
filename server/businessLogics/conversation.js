import mongoose from 'mongoose'
import Conversation from '../models/conversation.js';
import { httpStatusCodes } from '../utils/httpStatusCode.js';

/**
 * @param {string} pathName 
 * @returns {(userId: string | mongoose.Types.ObjectId, conversation: *) => boolean}
 */
const checkMemberOfConversationFunc = (pathName) =>
  (userId, conversation) => {
    userId = new mongoose.Types.ObjectId(userId);

    /** @type [*]? */
    const listUsers = conversation[pathName];

    if (listUsers) {
      return listUsers.some(m => userId.equals(m));
    }

    // there's not currently a list user in this conversation
    return false;
  }

export const isMemberOfConversation = checkMemberOfConversationFunc("listMembers");
export const isOwnerOfConversation = checkMemberOfConversationFunc("listOwners");


/**
 * @param {mongoose.Types.ObjectId | string} userId 
 * @param {mongoose.Types.ObjectId | string} conversationId 
 * @param {{ text: string, senderId }} message
 * @returns {Promise<{status: {code: string, msg: any}, newConversation: any?, req: {userId: any, conversationId: any, message: any}}>}
 */
export const addMessageToConversation = async (userId, conversationId, message) => {
  const req = {
    userId,
    conversationId,
    message,
  }

  if (!userId) {
    return {
      status: {
        code: httpStatusCodes.unauthorized,
        msg: "No userId",
      },
      req,
    }
  }

  if (!message) {
    return {
      status: {
        code: httpStatusCodes.badContent,
        msg: "No message"
      },
      req,
    }
  }

  const conversation = (await Conversation.findById(conversationId))?.toObject();

  if (!conversation) {
    // return res.status(httpStatusCodes.notFound).send();
    return {
      status: {
        code: httpStatusCodes.notFound,
        msg: `There's no conversation with id ${conversationId}`
      },
      req,
    }
  }

  if (!isMemberOfConversation(userId, conversation)) {
    return {
      status: {
        code: httpStatusCodes.forbidden,
        msg: "Not a member of conversation"
      },
      req,
    }
  }

  message.senderId = userId;
  if (conversation?.listMessages)
    conversation.listMessages = [message, ...conversation.listMessages];
  else
    conversation.listMessages = [message];

  const newConversation = await Conversation.findByIdAndUpdate(conversationId, conversation);

  return {
    status: {
      code: httpStatusCodes.ok,
    },
    newConversation: newConversation.toObject(),
    req,
  }
}