import React, { useState, useEffect } from "react";
import { Button } from "antd";

import "./styles.css";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import MessageHeader from "./MessageHeader/MessageHeader";
import MessageList from "./MessageList/MessageList";
import MessageForm from "./MessageForm/MessageForm";

import * as apiConversation from '../../api/conversation'

function ChatSpace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [currentId, setCurrentId] = useState();

  const [isAddConversation, setIsAdd] = useState(false); // to render conversation when add

  const [isAddMessage, setIsAddMessage] = useState(false);

  useEffect(() => {
    apiConversation.fetchConversationsOfUser().then((res) => {
      setCurrentId(res.data?.[0]?._id);
    })
  }, [isAddConversation]);

  return (
    <div>
      <div className="chat-container">
        <ChatSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} currentId={currentId} setCurrentId={setCurrentId} isAddConversation={isAddConversation} setIsAdd={setIsAdd} />
        <MessageHeader setOpenSidebar={setIsSidebarOpen} currentId={currentId} />
        <MessageList currentId={currentId} isAddMessage={isAddMessage} setIsAddMessage={setIsAddMessage} />
        <MessageForm currentId={currentId} setIsAddMessage={setIsAddMessage} />
      </div>
    </div>
  );
}

export default ChatSpace;
