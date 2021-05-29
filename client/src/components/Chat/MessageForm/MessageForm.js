import React, { useEffect, useState } from "react";
import { Tooltip, Input } from "antd";
import "../styles.css";
import { SendOutlined, PaperClipOutlined } from "@ant-design/icons";

import { useMessage } from '../../../hooks/useMessage'

function ChatForm({ currentId, setIsAddMessage }) {
  const message = useMessage()

  const [text, setText] = useState("");

  // test notification message
  useEffect(() => {
    message.onReceive(msg => {
      console.log(`user ${msg.req?.userId} said: ${msg.req?.message.text}`);
    });
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  }

  const handleSendMessage = () => {
    // alert(currentId + " || " + text);
    message.send(currentId, { text })
    setText("");
    setIsAddMessage(true);
  }

  return (
    <div className="chat-form">
      <Tooltip title="Attach">
        <PaperClipOutlined className="clickable icon white" />
      </Tooltip>
      <Input type="text" placeholder="type a message" onChange={(e) => handleChange(e)} />
      <Tooltip title="Send">
        <SendOutlined className="clickable icon white" onClick={() => handleSendMessage()} />
      </Tooltip>
    </div>
  );
}

export default ChatForm;
