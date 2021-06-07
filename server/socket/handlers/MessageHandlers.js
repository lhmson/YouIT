import CuteServerIO from "../CuteServerIO.js"
import { addMessageToConversation, setMemberSeenInConversation } from "../../businessLogics/conversation.js"
import { httpStatusCodes } from "../../utils/httpStatusCode.js";

/**
 * @param {CuteServerIO} cuteIO 
 */
export const setUpOnReceiveMessages = (cuteIO) => {
  cuteIO.queueReceiveHandler("Message-new", (params) => {
    const { conversationId, message } = params.msg;
    addMessageToConversation(params.userId, conversationId, message).then(
      result => {
        if (result.status.code === httpStatusCodes.ok) {
          cuteIO.sendToSocket(params.socket, "Message-ok", result);

          /** @type {{receiverIds: [*]?}} */
          const { receiverIds } = result.res;
          if (receiverIds) {
            delete result.res.receiverIds;
            receiverIds.forEach(m => cuteIO.sendToUser(m, "Message-receive", result, params.socket))
          }
        } else {
          cuteIO.sendToSocket(params.socket, "Message-error", result);
        }
      }
    )
  });


  cuteIO.queueReceiveHandler("Message-setSeen", params => {
    const { conversationId, newSeenValue } = params.msg;
    setMemberSeenInConversation(params.userId, conversationId, newSeenValue).then(
      result => {
        if (result.status.code === httpStatusCodes.ok) {
          if (result.res.isUpdated) {
            /** @type {{receiverIds: [*]?}} */
            const { receiverIds } = result.res;
            if (receiverIds) {
              delete result.res.receiverIds;
              delete result.res.isUpdated;

              receiverIds.forEach(m => cuteIO.sendToUser(m, "Message-seen", result))
            }
          }
        }
      }
    )

  })
}