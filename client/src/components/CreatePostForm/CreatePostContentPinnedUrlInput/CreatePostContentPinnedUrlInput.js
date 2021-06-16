import React from "react";
import styles from "./styles.js";
import { Input } from "antd";

function CreatePostContentPinnedUrlInput({ contentPinnedUrl, setContentPinnedUrl }) {
  const handleTextChange = (value) => {
    setContentPinnedUrl(value.target.value);
  };

  return (
    <div>
      <Input
        placeholder="Attached URL"
        value={contentPinnedUrl}
        onChange={handleTextChange}
      />
    </div>
  );
}

export default CreatePostContentPinnedUrlInput;
