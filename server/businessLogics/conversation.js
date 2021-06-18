import mongoose from "mongoose";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

/**
 * @param {string} pathName
 * @returns {(userId: string | mongoose.Types.ObjectId, conversation: POJO) => boolean}
 */
const checkMemberOfConversationFunc = (pathName) => (userId, conversation) => {
  userId = new mongoose.Types.ObjectId(userId);

  /** @type [*]? */
  const listUsers = conversation[pathName];

  if (listUsers) {
    return listUsers.some((m) => userId.equals(m) || userId.equals(m?._id));
  }

  // there's not currently a list user in this conversation
  return false;
};

export const isMemberOfConversation =
  checkMemberOfConversationFunc("listMembers");
export const isOwnerOfConversation =
  checkMemberOfConversationFunc("listOwners");
export const isConversationSeenByUser =
  checkMemberOfConversationFunc("listSeenMembers");

/**
 * Return an immutable function to add new member to a specific list
 * @param {string} pathName
 * @param {boolean} [allowDuplicated=false]
 * @returns {(userId: string | mongoose.Types.ObjectId, conversation: POJO) => POJO}
 */
const addMemberOfConversationFunc =
  (pathName, allowDuplicated = false) =>
    (userId, conversation) => {
      if (!conversation) return null;
      if (!userId) return conversation;

      userId = new mongoose.Types.ObjectId(userId);

      /** @type [*]? */
      let listUsers = conversation[pathName];
      listUsers = Array.isArray(listUsers) ? [...listUsers] : [];

      // I don't believe in set here so yeah let's implement it ourselves!
      if (
        allowDuplicated ||
        !listUsers.find((memberId) => userId.equals(memberId))
      ) {
        listUsers.push(userId);
      }

      return {
        ...conversation,
        [pathName]: listUsers,
      };
    };

/**
 * Return an immutable function to remove a member from a specific list
 * @param {string} pathName
 * @returns {(userId: string | mongoose.Types.ObjectId, conversation: POJO) => POJO}
 */
const removeMemberOfConversationFunc = (pathName) => (userId, conversation) => {
  if (!conversation) return null;
  if (!user) return conversation;

  userId = new mongoose.Types.ObjectId(userId);

  /** @type [*]? */
  let listUsers = conversation[pathName];
  if (!Array.isArray(listUsers)) listUsers = [];

  listUsers.filter((memberId) => !userId.equals(memberId));

  return {
    ...conversation,
    [pathName]: listUsers,
  };
};

const setUserAsSeenConversation = addMemberOfConversationFunc(
  "listSeenMembers",
  false
);
const setUserAsUnseenConversation =
  removeMemberOfConversationFunc("listSeenMembers");

/**
 * @param {mongoose.Types.ObjectId | string} userId
 * @param {mongoose.Types.ObjectId | string} conversationId
 * @param {{ text: string, senderId }} message
 * @returns {Promise<MessageEventResult>}
 */
export const addMessageToConversation = async (
  userId,
  conversationId,
  message
) => {
  const res = {
    userId,
    conversationId,
    message,
  };

  if (!userId) {
    return {
      status: {
        code: httpStatusCodes.unauthorized,
        msg: "No userId",
      },
      res,
    };
  }

  if (!message) {
    return {
      status: {
        code: httpStatusCodes.badContent,
        msg: "No message",
      },
      res,
    };
  }

  const conversation = (
    await Conversation.findById(conversationId)
  )?.toObject();

  if (!conversation) {
    // return res.status(httpStatusCodes.notFound).send();
    return {
      status: {
        code: httpStatusCodes.notFound,
        msg: `There's no conversation with id ${conversationId}`,
      },
      res,
    };
  }

  if (!isMemberOfConversation(userId, conversation)) {
    return {
      status: {
        code: httpStatusCodes.forbidden,
        msg: "Not a member of conversation",
      },
      res,
    };
  }

  message.senderId = userId;
  let newMessage = null;

  try {
    newMessage = new Message({
      ...message,
    });

    await (await newMessage.save()).populate({
      path: `senderId`,
      select: `name avatarUrl`,
      model: `User`,
    }).execPopulate();

  } catch (error) {
    return {
      status: {
        code: httpStatusCodes.internalServerError,
        msg: error,
      },
      res,
    };
  }
  const msgObj = newMessage.toObject();

  if (conversation?.listMessages)
    conversation.listMessages = [msgObj._id, ...conversation.listMessages];
  else conversation.listMessages = [msgObj._id];

  // reset seen members
  conversation.listSeenMembers = [];

  conversation.messageUpdatedAt = Date.now();

  const newConversation = await Conversation.findByIdAndUpdate(
    conversationId,
    conversation
  );

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
  };
};

/**
 * @param {mongoose.Types.ObjectId | string} userId
 * @param {mongoose.Types.ObjectId | string} conversationId
 * @param {boolean} newSeenValue
 * @returns {Promise<MessageEventResult>}
 */
export const setMemberSeenInConversation = async (
  userId,
  conversationId,
  newSeenValue
) => {
  const res = {
    conversationId: conversationId.toString(),
    userId: userId.toString(),
    seenValue: newSeenValue,
  };

  if (!userId) {
    return {
      status: {
        code: httpStatusCodes.unauthorized,
        msg: "No userId",
      },
      res,
    };
  }

  const conversation = (
    await Conversation.findById(conversationId)
  )?.toObject();

  if (!conversation) {
    // return res.status(httpStatusCodes.notFound).send();
    return {
      status: {
        code: httpStatusCodes.notFound,
        msg: `There's no conversation with id ${conversationId}`,
      },
      res,
    };
  }

  if (!isMemberOfConversation(userId, conversation)) {
    return {
      status: {
        code: httpStatusCodes.forbidden,
        msg: "Not a member of conversation",
      },
      res,
    };
  }

  const newConversation = newSeenValue
    ? setUserAsSeenConversation(userId, conversation)
    : setUserAsUnseenConversation(userId, conversation);

  const isUpdated =
    conversation?.listSeenMembers?.length !==
    newConversation?.listSeenMembers?.length;

  if (newConversation)
    await Conversation.findByIdAndUpdate(conversationId, newConversation);

  return {
    status: {
      code: httpStatusCodes.ok,
    },
    res: {
      senderId: userId,
      conversationId,
      seenValue: newSeenValue,
      receiverIds: newConversation?.listMembers,
      listSeenMembers: newConversation?.listSeenMembers,
      isUpdated,
    },
  };
};

/**
 * @typedef {{status: {code: string, msg: any}, res: {senderId: string, conversationId: string, message: any, receiverIds: string, seenValue: boolean, listSeenMembers: [string]}}} MessageEventResult
 */

/**
 * @typedef {mongoose.LeanDocument<mongoose.Document<any,{}>} POJO
 */
