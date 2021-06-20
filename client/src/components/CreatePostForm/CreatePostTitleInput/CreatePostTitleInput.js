import React from "react";
import createPostStyle from "../styles.js"
import { Input } from "antd";
import * as constants from '../constant.js'

function CreatePostTitleInput({ title, setTitle }) {
  const handleTextChange = (value) => {
    setTitle(value.target.value);
  };

  return (
    <div>
      <Input
        placeholder="/* Title */"
        value={title}
        onChange={handleTextChange}
        style={createPostStyle.editorFont}
        maxLength={constants.MAX_LENGTH_TITLE}
      />
    </div>
  );
}

export default CreatePostTitleInput;
