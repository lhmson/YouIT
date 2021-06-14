import React, { useRef, useState } from "react";
import { Tooltip, Input, message } from "antd";
import "../styles.css";
import { SendOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Loading } from "../..";
const { TextArea } = Input;

function ChatForm({
  currentId,
  setIsAddMessage,
  messageHandle,
  listConversations,
  updateListConversations,
  checkSending,
  addSending,
}) {
  const [inputText, setInputText] = useState({ content: "" });

  // const inputRef = useRef();

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
      message.error("No conversation selected");
      return;
    }
    // alert(currentId + " || " + inputRef.current.state.value);
    const text = inputText.content.trim();
    if (text) {
      // sending message
      messageHandle.send(currentId, { text });
      addSending(currentId);
    }
    // inputRef.current.state.value = "";
    setInputText({ content: "" });
  };

  return (
    <div className="chat-form">
      <Tooltip title="Attach">
        <PaperClipOutlined className="clickable icon green ml-2 mr-4" />
      </Tooltip>
      <TextArea
        autoSize={{ minRows: 1, maxRows: 3 }}
        // type="text"
        placeholder="Type a message"
        autoFocus
        onChange={(e) => setInputText({ content: e.target.value })}
        value={inputText.content}
        disabled={currentId ? false : true}
        onPressEnter={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        // onChange={(e) => handleChange(e)}
      />
      {!checkSending(currentId) ? (
        <Tooltip title="Send">
          <SendOutlined
            className="clickable icon green ml-4 mr-2"
            onClick={() => handleSendMessage()}
          />
        </Tooltip>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ChatForm;
