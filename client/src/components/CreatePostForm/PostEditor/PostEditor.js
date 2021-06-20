import React from "react";
import { MarkdownEditor } from "../../"
import createPostStyle from "../styles.js"

function PostEditor({ postContentText, setPostContentText }) {
  return (
    <div>
      <MarkdownEditor
        style={createPostStyle.editorFont}
        text={postContentText}
        setText={setPostContentText}
        placeholder="// Start your blog here!"
      />
    </div>
  );
}

export default PostEditor;
