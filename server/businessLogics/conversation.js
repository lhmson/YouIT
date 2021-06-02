import mongoose from 'mongoose'
import Conversation from '../models/conversation.js';
import Message from '../models/message.js';
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
 * @returns {Promise<{status: {code: string, msg: any}, res: {senderId: any, conversationId: any, message: any, receiverIds: any}}>}
 */
export const addMessageToConversation = async (userId, conversationId, message) => {
  const res = {
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
      res,
    }
  }

  if (!message) {
    return {
      status: {
        code: httpStatusCodes.badContent,
        msg: "No message"
      },
      res,
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
      res,
    }
  }

  if (!isMemberOfConversation(userId, conversation)) {
    return {
      status: {
        code: httpStatusCodes.forbidden,
        msg: "Not a member of conversation"
      },
      res,
    }
  }

  message.senderId = userId;
  let newMessage = null;

  try {
    newMessage = new Message({
      ...message,
    });

    await newMessage.save();
  } catch (error) {
    return {
      status: {
        code: httpStatusCodes.internalServerError,
        msg: error,
      },
      res,
    }
  }
  const msgObj = newMessage.toObject();

  if (conversation?.listMessages)
    conversation.listMessages = [msgObj._id, ...conversation.listMessages];
  else
    conversation.listMessages = [msgObj._id];

  const newConversation = await Conversation.findByIdAndUpdate(conversationId, conversation);

  return {
    status: {
      code: httpStatusCodes.ok,
    },
    res: {
      senderId: userId,
      conversationId,
      message: msgObj,
      receiverIds: newConversation?.toObject?.().listMembers,
    },
  }
}