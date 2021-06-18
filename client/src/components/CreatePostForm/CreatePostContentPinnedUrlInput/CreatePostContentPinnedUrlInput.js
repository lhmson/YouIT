import React from "react";
import styles from "./styles.js";
import { Input } from "antd";
import createPostStyle from "../styles.js"

function CreatePostContentPinnedUrlInput({ contentPinnedUrl, setContentPinnedUrl }) {
  const handleTextChange = (value) => {
    setContentPinnedUrl(value.target.value);
  };

  return (
    <div>
      <Input
        placeholder="// Attached URL"
        value={contentPinnedUrl}
        onChange={handleTextChange}
        style={createPostStyle.editorFont}
      />
    </div>
  );
}

export default CreatePostContentPinnedUrlInput;
