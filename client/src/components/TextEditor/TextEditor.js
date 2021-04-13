import React, { useState } from "react";
import { Button, notification, Card, Typography, Space } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./styles.js";

const { Title, Text } = Typography;

function TextEditor() {
  const [content, setContent] = useState();
  const handleChange = (val) => {
    setContent(val);
  };

  const prompt = () => {
    notification.open({
      message: "We got value:",
      description: <span dangerouslySetInnerHTML={{ __html: content }} />,
    });
  };

  return (
    <>
      <Card title="Rich text editor">
        <ReactQuill value={content} onChange={handleChange} />
        <Space direction="vertical">
          <Button style={{ marginTop: 16 }} onClick={prompt}>
            Prompt
          </Button>
          <Text>{content}</Text>
        </Space>
      </Card>
    </>
  );
}

export default TextEditor;
