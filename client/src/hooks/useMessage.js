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
   * add handler to handle on new message is sent successfully (i.e saved to DB)
   * @param {(msg: { status: { code: string, msg: any }, newConversation: any, req: { userId: any, conversationId: any, message: any, }}) => any} handler 
   */
  const onSent = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-ok", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }


  /**
   * add handler to handle on new message is failed to be sent
   * @param {(msg: { status: { code: string, msg: any }, newConversation: any, req: { userId: any, conversationId: any, message: any, }}) => any} handler 
   */
  const onFailed = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-error", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }

  /**
   * add handler to handle on new message received by others
   * @param {(msg: { status: { code: string, msg: any }, newConversation: any, req: { userId: any, conversationId: any, message: any, }}) => any} handler 
   */
  const onReceive = (handler) => {
    const cleanUp = cuteIO.onReceive("Message-receive", handler);
    cleanUpCallbacks.current.push(cleanUp);
  }

  const cleanUpAll = () => {
    cleanUpCallbacks.current.forEach(clean => clean?.());
  }

  return {
    send,
    onSent,
    onFailed,
    onReceive,
    cleanUpAll,
  }
}