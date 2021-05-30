import React, { useEffect, useState } from "react";
import { Tooltip, Typography } from "antd";
import "../styles.css";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useMessage } from "../../../hooks/useMessage";
import moment from "moment";

import * as apiConversation from "../../../api/conversation";

const { Text } = Typography;

// const testData = [
//   {
//     userId: "me",
//     message:
//       "Well we need to work out sometime soon where we really want to record our video course.",
//     time: "Apr 16",
//   },
//   {
//     userId: "Batman",
//     message:
//       "I'm just in the process of finishing off the last pieces of materialfor the course",
//     time: "Apr 15",
//   },
//   {
//     userId: "me",
//     message: "How's it going?",
//     time: "Apr 15",
//   },
//   {
//     userId: "Batman",
//     message: "Hey mate what's up?",
//     time: "Apr 14",
//   },
//   {
//     userId: "me",
//     message: "Hey Daryl",
//     time: "Apr 14",
//   },
//   {
//     userId: "Batman",
//     message: "Hey mate what's up?",
//     time: "Apr 13",
//   },
//   {
//     userId: "me",
//     message: "Hey Daryl",
//     time: "Apr 12",
//   },
//   {
//     userId: "Batman",
//     message: "Hey mate what's up?",
//     time: "Apr 12",
//   },
//   {
//     userId: "me",
//     message: "Hey Daryl",
//     time: "Apr 12",
//   },
// ];

function ConversationList({ currentId, isAddMessage, setIsAddMessage, messageHandle }) {


  const [listMessages, setListMessages] = useState([]);

  const [user] = useLocalStorage("user");

  useEffect(() => {
    // alert("current" + currentId);
    if (currentId) {
      apiConversation.fetchAConversation(currentId, 100).then((res) => {
        setListMessages(res.data?.listMessages);
      });
      setIsAddMessage(false);
    }
  }, [currentId, isAddMessage]);
  //TODO: send message render again, change to redux

  return (
    <div className="chat-message-list">
      {listMessages.length === 0 ? (
        <div className="text-center" style={{ fontSize: "1.5rem" }}>
          <Text>You have not sent any message to others</Text>
        </div>
      ) : (
        listMessages.map((item, i) => (
          <div
            key={i}
            className={`message-row ${item.senderId === user?.result?._id
              ? "you-message"
              : "other-message"
              }`}
          >
            <div className="message-content">
              <Tooltip title={item.senderId} placement="bottom">
                {item.senderId !== user?.result?._id && (
                  <img
                    src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                    alt={item.senderId}
                  />
                )}
              </Tooltip>
              <Tooltip
                title={moment(item.createdAt).format("MMMM Do YYYY")}
                placement="top"
              >
                <div className="message-text">{item.text}</div>
              </Tooltip>
              <div className="message-time">
                {moment(item.createdAt).format("h:mm:ss a")}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ConversationList;
