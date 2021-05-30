import React, { useEffect, useRef, useState } from "react";
import { Tooltip, Input, message } from "antd";
import "../styles.css";
import { SendOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Loading } from "../..";

function ChatForm({ currentId, setIsAddMessage, messageHandle, listConversations, updateListConversations, checkSending, addSending }) {

  // const [text, setText] = useState("");

  const inputRef = useRef();

  const [currentConversation, setCurrentConversation] = useState();

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setText(e.target.value);
  // };

  // useEffect(() => {
  //   setCurrentConversation(listConversations.find((item) => item._id === currentId))

  //   if (currentConversation?.isSending) {
  //     setIsAddMessage(true);
  //   }
  // }, [listConversations, currentId])

  const handleSendMessage = () => {
    if (!currentId) {
      message.error('No conversation selected');
      return;
    }
    // alert(currentId + " || " + inputRef.current.state.value);
    const text = inputRef.current.state.value?.trim();
    if (text) {
      // sending message
      messageHandle.send(currentId, { text });
      addSending(currentId);
    }
    inputRef.current.state.value = "";
  };

  return (
    <div className="chat-form">
      <Tooltip title="Attach">
        <PaperClipOutlined className="clickable icon white" />
      </Tooltip>
      <Input
        type="text"
        placeholder="type a message"
        autoFocus
        ref={inputRef}
        disabled={currentId ? false : true}
        onPressEnter={() => handleSendMessage()}
      // onChange={(e) => handleChange(e)}
      />
      {
        !checkSending(currentId) ? (<Tooltip title="Send">
          <SendOutlined
            className="clickable icon white"
            onClick={() => handleSendMessage()}
          />
        </Tooltip>) : <Loading />
      }

    </div>
  );
}

export default ChatForm;
