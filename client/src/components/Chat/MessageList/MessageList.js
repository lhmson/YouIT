import React, { useEffect } from "react";
import { Avatar, Tooltip } from "antd";

import "../styles.css";

import { Link } from "react-router-dom";
import "../styles.css";

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

function ConversationList() {
  useEffect(() => {}, []);

  return (
    <div className="chat-message-list">
      {testData.map((item, i) => (
        <div
          className={`message-row ${
            item.userId === "me" ? "you-message" : "other-message"
          }`}
        >
          <div className="message-content">
            {item.userId !== "me" && (
              <img
                src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                alt={item.userId}
              />
            )}
            <div className="message-text">{item.message}</div>
            <div className="message-time">{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConversationList;
