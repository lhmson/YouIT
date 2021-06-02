import React, { useState, useEffect } from "react";
import { Button, message } from "antd";

import "./styles.css";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import MessageHeader from "./MessageHeader/MessageHeader";
import MessageList from "./MessageList/MessageList";
import MessageForm from "./MessageForm/MessageForm";

import * as apiConversation from "../../api/conversation";
import { useMessage } from "../../hooks/useMessage";
import { useConversations } from "../../context/ConversationsContext";

function ChatSpace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const [currentId, setCurrentId] = useState();

  const messageHandle = useMessage();

  const conversations = useConversations();
  // console.log(conversations);

  const { currentId, listConversations } = conversations.state;

  const {
    updateCurrentId,
    updateListConversations,
    addConversation,
    addSending,
    removeSending,
    checkSending,
  } = conversations;

  // const [isAddConversation, setIsAdd] = useState(false); // to render conversation when add

  const [isAddMessage, setIsAddMessage] = useState(false);

  useEffect(() => {
    apiConversation.fetchConversationsOfUser().then((res) => {
      if (res.data.length > 0) {
        conversations.updateCurrentId(res.data[0]?._id);
      }
    });
  }, [conversations.state.listConversations]);

  // test notification message
  useEffect(() => {
    messageHandle.onReceive((msg) => {
      console.log(`user ${msg.res?.userId} said: ${msg.res?.message.text}`);
      setIsAddMessage(true);
    });

    messageHandle.onSent((msg) => {
      removeSending(msg?.res?.conversationId);
      setIsAddMessage(true);
    });

    messageHandle.onFailed((msg) => {
      message.error("Fail to send message, try again");
      removeSending(msg?.res?.conversationId);
    });

    return messageHandle.cleanUpAll;
  }, []);

  // useEffect(() => {
  //   apiConversation.fetchConversationsOfUser().then((res) => {
  //     setCurrentId(res.data?.[0]?._id);
  //   });
  // }, [isAddConversation]);

  return (
    <div>
      <div className="chat-container">
        <ChatSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          currentId={currentId}
          listConversations={listConversations}
          updateCurrentId={updateCurrentId}
          addConversation={addConversation}
          updateListConversations={updateListConversations}
          // setCurrentId={setCurrentId}
          // isAddConversation={isAddConversation}
          // setIsAdd={setIsAdd}
        />
        <MessageHeader
          setOpenSidebar={setIsSidebarOpen}
          currentId={currentId}
        />
        <MessageList
          currentId={currentId}
          isAddMessage={isAddMessage}
          setIsAddMessage={setIsAddMessage}
          messageHandle={messageHandle}
        />
        <MessageForm
          currentId={currentId}
          setIsAddMessage={setIsAddMessage}
          messageHandle={messageHandle}
          listConversations={listConversations}
          updateListConversations={updateListConversations}
          addSending={addSending}
          checkSending={checkSending}
        />
      </div>
    </div>
  );
}

export default ChatSpace;
