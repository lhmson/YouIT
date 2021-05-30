import React, { useState, useEffect } from "react";
import { Button } from "antd";

import "./styles.css";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import MessageHeader from "./MessageHeader/MessageHeader";
import MessageList from "./MessageList/MessageList";
import MessageForm from "./MessageForm/MessageForm";

import * as apiConversation from "../../api/conversation";
import { useConversations } from "../../context/ConversationsContext";
import { Loading } from "..";

function ChatSpace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const [currentId, setCurrentId] = useState();

  const conversations = useConversations();
  // console.log(conversations);

  const { currentId, listConversations } = conversations.state;

  const { updateCurrentId, updateListConversations, addConversation } =
    conversations;

  // const [isAddConversation, setIsAdd] = useState(false); // to render conversation when add

  const [isAddMessage, setIsAddMessage] = useState(false);

  const [statusMessage, setStatusMessage] = useState([]);

  useEffect(() => {
    apiConversation.fetchConversationsOfUser().then((res) => {
      if (res.data.length > 0) {
        conversations.updateCurrentId(res.data[0]?._id);
      }
    });
  }, [conversations.state.listConversations]);

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
        />
        <MessageForm currentId={currentId} setIsAddMessage={setIsAddMessage} />
      </div>
    </div>
  );
}

export default ChatSpace;
