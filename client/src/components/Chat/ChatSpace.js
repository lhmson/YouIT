import React, { useState } from "react";
import { Button } from "antd";

import "./styles.css";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import MessageHeader from "./MessageHeader/MessageHeader";
import ConversationList from "./ConversationList/ConversationList";
import MessageForm from "./MessageForm/MessageForm";

function ChatSpace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <div className="chat-container">
        <ChatSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <MessageHeader setOpenSidebar={setIsSidebarOpen} />
        <ConversationList />
        <MessageForm />
      </div>
    </div>
  );
}

export default ChatSpace;
