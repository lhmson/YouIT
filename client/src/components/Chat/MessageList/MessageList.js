import React, { useEffect, useState } from "react";
import { Avatar, Tooltip } from "antd";
import "../styles.css";
import { Link } from "react-router-dom";
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import * as apiConversation from '../../../api/conversation'

const testData = [
  {
    userId: "me",
    message:
      "Well we need to work out sometime soon where we really want to record our video course.",
    time: "Apr 16",
  },
  {
    userId: "Batman",
    message:
      "I'm just in the process of finishing off the last pieces of materialfor the course",
    time: "Apr 15",
  },
  {
    userId: "me",
    message: "How's it going?",
    time: "Apr 15",
  },
  {
    userId: "Batman",
    message: "Hey mate what's up?",
    time: "Apr 14",
  },
  {
    userId: "me",
    message: "Hey Daryl",
    time: "Apr 14",
  },
  {
    userId: "Batman",
    message: "Hey mate what's up?",
    time: "Apr 13",
  },
  {
    userId: "me",
    message: "Hey Daryl",
    time: "Apr 12",
  },
  {
    userId: "Batman",
    message: "Hey mate what's up?",
    time: "Apr 12",
  },
  {
    userId: "me",
    message: "Hey Daryl",
    time: "Apr 12",
  },
];

function ConversationList({ currentId, isAddMessage, setIsAddMessage }) {
  const [listMessages, setListMessages] = useState([]);

  const [user] = useLocalStorage("user")
  useEffect(() => {
    apiConversation.fetchAConversation(currentId, 6).then((res) => {
      setListMessages((prev) => {
        return [...new Set([...prev, ...res.data?.listMessages?.map((b) => b)])];
      })
    })
    setIsAddMessage(false);
  }, [isAddMessage]);
  //TODO send message render again, change to redux

  return (
    <div className="chat-message-list">
      {listMessages.map((item, i) => (
        <div
          className={`message-row ${item.senderId === user?.result?._id ? "you-message" : "other-message"
            }`}
        >
          <div className="message-content">
            {item.senderId !== user?.result?._id && (
              <img
                src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                alt={item.senderId}
              />
            )}
            <div className="message-text">{item.text}</div>
            <div className="message-time">{item.createdAt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConversationList;
