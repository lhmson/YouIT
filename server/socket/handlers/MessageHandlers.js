import CuteServerIO from "../CuteServerIO.js"
import { addMessageToConversation } from "../../businessLogics/conversation.js"

/**
 * @param {CuteServerIO} cuteIO 
 */
export const setUpOnReceiveMessages = (cuteIO) => {
  cuteIO.queueReceiveHandler("Message-new", (params) => {
    const { conversationId, message } = params.msg;
    addMessageToConversation(params.userId, conversationId, message).then(
      result => {
        // console.log("messgage test", result);
        if (result.newConversation) {
          const conversation = result.newConversation;
          cuteIO.sendToSocket(params.socket, "Message-ok", result);

          /** @type {{listMembers: [*]?}} */
          const { listMembers } = conversation;
          if (listMembers) {
            listMembers.forEach(m => cuteIO.sendToUser(m, "Message-receive", result, params.socket))
          }
        } else {
          cuteIO.sendToSocket(params.socket, "Message-error", result);
        }
      }
    )
  });
}