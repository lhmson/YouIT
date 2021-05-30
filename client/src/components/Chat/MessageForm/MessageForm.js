import React, { useEffect, useRef } from "react";
import { Tooltip, Input } from "antd";
import "../styles.css";
import { SendOutlined, PaperClipOutlined } from "@ant-design/icons";

import { useMessage } from "../../../hooks/useMessage";

function ChatForm({ currentId, setIsAddMessage }) {
  const message = useMessage();

  // const [text, setText] = useState("");

  const inputRef = useRef();

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setText(e.target.value);
  // };

  const handleSendMessage = () => {
    // alert(currentId + " || " + inputRef.current.state.value);
    const text = inputRef.current.state.value.trim();
    if (text) {
      message.send(currentId, { text });
      setIsAddMessage(true);
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
        onPressEnter={() => handleSendMessage()}
        // onChange={(e) => handleChange(e)}
      />
      <Tooltip title="Send">
        <SendOutlined
          className="clickable icon white"
          onClick={() => handleSendMessage()}
        />
      </Tooltip>
    </div>
  );
}

export default ChatForm;
