import { useRef } from "react";
import { useCuteClientIO } from "../socket/CuteClientIOProvider"

export const useMessage = () => {
  const cuteIO = useCuteClientIO();
  const cleanUpCallbacks = useRef([]);

  /**
   * @param {string} conversationId 
   * @param {{text: string}} message 
   */
  const send = (conversationId, message) => {
    cuteIO.send("Message-new", { conversationId, message })
  }

  /**
   * @param {string} conversationId 
   * @param {boolean} newSeenValue 
   */
  const setSeen = (conversationId, newSeenValue) => {
    cuteIO.send("Message-setSeen", { conversationId, newSeenValue });
  }

  /**
   * add handler to handle on new message is sent successfully (i.e saved to DB)
   * @param {(msg: MessageEventParams) => any} handler
   */
  const onSent = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-ok", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }


  /**
   * add handler to handle on new message is failed to be sent
   * @param {(msg: MessageEventParams) => any} handler
   */
  const onFailed = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-error", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }

  /**
   * add handler to handle on new message received by others
   * @param {(msg: MessageEventParams) => any} handler
   */
  const onReceive = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-receive", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }


  /**
   * add handler to handle when a conversation is seen by ANYONE (including this user) 
   * @param {(msg: MessageEventParams) => any} handler
   */
  const onSeen = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-seen", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }


  /**
   * add handler to handle when a message is removed
   * @param {(msg: MessageEventParams) => any} handler
   */
  const onRemove = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-remove", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }


  /**
   * add handler to handle when a conversation is created 
   * @param {(msg: MessageEventParams) => any} handler
   */
  const onConversationCreated = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-conversationCreated", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }


  /**
   * add handler to handle when a conversation is updated 
   * @param {(msg: MessageEventParams) => any} handler
   */
  const onConversationUpdated = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-conversationUpdated", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }


  /**
   * add handler to handle when a conversation is deleted 
   * @param {(msg: MessageEventParams) => any} handler
   */
  const onConversationDeleted = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-conversationDeleted", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }


  const cleanUpAll = () => {
    cleanUpCallbacks.current.forEach(clean => clean());
    cleanUpCallbacks.current.length = 0;
  }

  return {
    send,
    onSent,
    onFailed,
    onReceive,
    onRemove,

    setSeen,
    onSeen,

    onConversationCreated,
    onConversationUpdated,
    onConversationDeleted,

    cleanUpAll,
  }
}

/** @typedef {object} MessageEventParams
 * @property {{code: string, msg: string}} Status
 * @property {{senderId: string, conversationId: string, seenValue: boolean, message: any, listSeenMembers: [string], messageId:string}} res
 */