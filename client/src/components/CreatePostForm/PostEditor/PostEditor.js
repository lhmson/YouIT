import React from "react";
// import MDEditor from "@uiw/react-md-editor";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

// import styles from "./styles.js";
// import { postEditorCommands } from "./commands.js";

function PostEditor({ postContentText, setPostContentText }) {
  if (postContentText === null || postContentText === undefined || !setPostContentText)
    return (
      <div>
        <p>postContent and setPostContent is required!</p>
      </div>
    );

  return (
    <div>
      <SimpleMDE
        value={postContentText}
        onChange={setPostContentText}
      />
    </div>
  );
}

export default PostEditor;
