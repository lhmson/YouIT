import React, { useEffect, useState, useCallback } from "react";
import { Button, message, Tooltip, Typography } from "antd";
import "../styles.css";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useMessage } from "../../../hooks/useMessage";
import moment from "moment";

import * as apiConversation from "../../../api/conversation";

const { Text } = Typography;

function ConversationList({
  currentId,
  isAddMessage,
  setIsAddMessage,
}) {
  const MESSAGE_PER_LOAD = 5;

  const [listMessages, setListMessages] = useState([]);
  const [user] = useLocalStorage("user");

  //we need to know if there is more data
  const [hasMore, setHasMore] = useState(true);

  const messageHandle = useMessage();

  useEffect(() => {
    if (currentId) {
      messageHandle.onReceive((msg) => {
        if (msg.res.conversationId === currentId) {
          handleLoadNewMessage();
        }
      });

      messageHandle.onSent((msg) => {
        if (msg.res.conversationId === currentId) {
          handleLoadNewMessage();
        }
      });

      handleLoadMoreMessage(0);
    }

    return messageHandle.cleanUpAll;
  }, [currentId])

  const handleLoadNewMessage = () => {
    apiConversation.fetchAConversation(currentId, 0, 0).then(
      res => {
        const fetchedMsgs = res.data?.listMessages;
        if (fetchedMsgs)
          setListMessages(prev => [...fetchedMsgs, ...prev]);
      }
    );
  }

  const handleLoadMoreMessage = (start) => {
    apiConversation.fetchAConversation(currentId, start, start + MESSAGE_PER_LOAD - 1).then(
      res => {
        const fetchedMsgs = res.data?.listMessages;
        if (fetchedMsgs) {
          setListMessages(prev => [...prev, ...fetchedMsgs]);

          if (fetchedMsgs.length < MESSAGE_PER_LOAD)
            setHasMore(false);
        }
      }
    );
  }

  return (
    <div className="chat-message-list">
      {listMessages.length === 0 ? (
        <div className="text-center" style={{ fontSize: "1.5rem" }}>
          <Text>You have not sent any message to others</Text>
        </div>
      ) : (
        <>

          {listMessages.map((item, i) => (
            <div
              key={i}
              className={`message-row ${item.senderId._id === user?.result?._id
                ? "you-message"
                : "other-message"
                }`}
            >
              <div className="message-content">
                <Tooltip title={item.senderId.name} placement="bottom">
                  {item.senderId._id !== user?.result?._id && (
                    <img
                      src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                      alt={item.senderId._id}
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
          ))}
          {hasMore && <Button onClick={() => handleLoadMoreMessage(listMessages.length)}>Load more</Button>}
        </>
      )}
    </div>
  );
}

export default ConversationList;
