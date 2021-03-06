import React, { useEffect, useState } from "react";
import { Button, Tooltip, Typography, Modal, message } from "antd";
import "../styles.css";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useMessage } from "../../../hooks/useMessage";
import moment from "moment";

import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import * as apiConversation from "../../../api/conversation";

const { Text } = Typography;

function ConversationList({ currentId, listSeenMembers, setListSeenMembers }) {
  const MESSAGE_PER_LOAD = 5;
  const MESSAGE_DELETE_DELAY = 1000;

  const [listMessages, setListMessages] = useState([]);

  const [user] = useLocalStorage("user");

  //we need to know if there is more data
  const [hasMore, setHasMore] = useState(true);

  const [toBeDeletedMessages, setToBeDeletedMessages] = useState([]);

  const messageHandle = useMessage();

  useEffect(() => {
    if (currentId) {
      messageHandle.onReceive((msg) => {
        if (msg.res.conversationId === currentId) {
          handleAddNewMessage(msg?.res?.message);
        }
      });

      messageHandle.onSent((msg) => {
        if (msg.res.conversationId === currentId) {
          handleAddNewMessage(msg?.res?.message);
        }
      });

      messageHandle.onRemove((msg) => {
        if (msg.res.conversationId === currentId) {
          handleMessageDeleted(msg.res.messageId);
        }
      });

      messageHandle.onSeen((msg) => {
        if (msg.res.conversationId === currentId) {
          handleLoadListSeenMembers();
        }
      });

      handleLoadMoreMessage(0);

      handleSetSeenMessage();
      handleLoadListSeenMembers();
    }

    return () => {
      messageHandle.cleanUpAll();
      setListMessages([]);
      setListSeenMembers([]);
    };
  }, [currentId]);

  const handleAddNewMessage = (newMsg) => {
    if (newMsg) {
      setListMessages((prev) => [newMsg, ...prev]);
      handleSetSeenMessage();
    }
  };

  const handleLoadMoreMessage = (start) => {
    apiConversation
      .fetchAConversation(currentId, start, start + MESSAGE_PER_LOAD - 1)
      .then((res) => {
        const fetchedMsgs = res.data?.listMessages;
        if (fetchedMsgs) {
          setListMessages((prev) => [...prev, ...fetchedMsgs]);

          if (fetchedMsgs.length < MESSAGE_PER_LOAD) setHasMore(false);
        }
      });
  };

  const handleSetSeenMessage = () => {
    if (currentId)
      // if (!listSeenMembers.includes(user?.result?._id))
      messageHandle.setSeen(currentId, true);
  };

  const handleLoadListSeenMembers = () => {
    apiConversation.fetchAConversation(currentId, 0, 0).then((res) => {
      const fetchedSeenMembers = res.data?.listSeenMembers;
      if (fetchedSeenMembers) setListSeenMembers(fetchedSeenMembers);
    });
  };

  /** send delete request */
  const handleDeleteMessage = (messageId) => {
    Modal.confirm({
      title: "Do you want to delete this message?",
      icon: <ExclamationCircleOutlined />,
      content: "You cannot undo this action",
      onOk() {
        const key = `delete_message_${messageId}`;
        message.loading({ content: "Deleting message...", key });
        apiConversation.deleteMessage(currentId, messageId)
          .then(() =>
            message.success({ content: "Message deleted.", key, duration: 1 })
          )
          .catch(() =>
            message.error({ content: "Something went wrong.", key, duration: 1 })
          );
      },
      onCancel() {
      },
    })
  };

  /** handle when receive delete request */
  const handleMessageDeleted = (messageId) => {
    setToBeDeletedMessages((prev) => [...prev, messageId]);

    setTimeout(() => {
      setListMessages((prev) => prev.filter((msg) => msg?._id !== messageId));
      setToBeDeletedMessages((prev) =>
        prev.filter((msg) => msg?._id !== messageId)
      );
    }, MESSAGE_DELETE_DELAY);
  };

  return (
    <div className="chat-message-list">
      {!hasMore && listMessages.length === 0 ? (
        <div className="text-center" style={{ fontSize: "1.5rem" }}>
          <Text>You have not sent any message to others</Text>
        </div>
      ) : (
        <>
          {listMessages?.map((item, i) => (
            <div
              key={item.toString()}
              className={`message-row ${item.senderId._id === user?.result?._id
                ? "you-message"
                : "other-message"
                }`}
            >
              <div className="message-content">
                <Tooltip title={item.senderId.name} placement="bottom">
                  {item.senderId._id !== user?.result?._id && (
                    <img
                      src={
                        item.senderId.avatarUrl ??
                        "https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                      }
                      alt={item.senderId._id}
                    />
                  )}
                </Tooltip>
                <div className="d-flex align-items-center">
                  {item.senderId._id === user?.result?._id && (
                    <>
                      <Tooltip title="Delete">
                        <DeleteOutlined
                          className="clickable icon mr-2"
                          onClick={() => handleDeleteMessage(item?._id)}
                        />
                      </Tooltip>
                    </>
                  )}
                  <Tooltip
                    title={moment(item.createdAt).format("MMMM Do YYYY")}
                    placement="top"
                  >
                    <div
                      className="message-text"
                      style={
                        toBeDeletedMessages.includes(item?._id)
                          ? { backgroundColor: "#ff6961" }
                          : {}
                      } // Refactor this to CSS?
                    >
                      {item.text}
                    </div>
                  </Tooltip>
                </div>

                <div className="message-time">
                  {moment(item.createdAt).format("h:mm:ss a")}
                </div>
              </div>
            </div>
          ))}
          {hasMore && (
            <Button onClick={() => handleLoadMoreMessage(listMessages.length)}>
              Load more
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default ConversationList;
