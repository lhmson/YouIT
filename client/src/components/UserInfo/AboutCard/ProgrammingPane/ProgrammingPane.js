import React, { useState } from "react";
import { Button, Input, Layout, Row, Tag } from "antd";

import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.js";

function ProgrammingPane() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const tempHashtags = [
    "tag1",
    "tag2",
    "tag3",
    "tag4",
    "tag5",
    "tag6",
    "tag7",
    "tag8",
    "tag9",
  ];

  const removeHashtag = () => {};

  const handleInputConfirm = () => {
    setIsAdding(false);
    console.log(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const TagItems = () => {
    return tempHashtags.map((hashtag) => {
      return (
        <span
          key={hashtag}
          style={{ display: "inline-block", marginBottom: 8 }}
        >
          <Tag
            color="green"
            closable
            onClose={(e) => {
              e.preventDefault();
              removeHashtag();
            }}
          >
            {hashtag}
          </Tag>
        </span>
      );
    });
  };

  return (
    <Layout style={{ background: "white" }}>
      <Row>{TagItems()}</Row>
      <Row style={{ display: "inline-block", marginTop: 8 }}>
        {isAdding ? (
          <Input
            style={{ width: "30%" }}
            onPressEnter={handleInputConfirm}
            onBlur={handleInputConfirm}
            onChange={handleInputChange}
            autoFocus={true}
          ></Input>
        ) : (
          <Button className="green-button" onClick={() => setIsAdding(true)}>
            New hashtag
          </Button>
        )}
      </Row>
    </Layout>
  );
}

export default ProgrammingPane;
