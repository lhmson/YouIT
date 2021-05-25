import React, { useState } from "react";
import { Tooltip } from "antd";
import "../styles.css";
import { SendOutlined, PaperClipOutlined } from "@ant-design/icons";

function ChatForm() {
  return (
    <div className="chat-form">
      <Tooltip title="Attach">
        <PaperClipOutlined className="clickable icon white" />
      </Tooltip>
      <input type="text" placeholder="type a message" />
      <Tooltip title="Send">
        <SendOutlined className="clickable icon white" />
      </Tooltip>
    </div>
  );
}

export default ChatForm;
