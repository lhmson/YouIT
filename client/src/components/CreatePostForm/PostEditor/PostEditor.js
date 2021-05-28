import React from "react";
import MDEditor from "@uiw/react-md-editor";

import styles from "./styles.js";
import { postEditorCommands } from "./commands.js";

function PostEditor({ postContentText, setPostContentText }) {
  if (postContentText === null || postContentText === undefined || !setPostContentText)
    return (
      <div>
        <p>postContent and setPostContent is required!</p>
      </div>
    );

  return (
    <div>
      <MDEditor
        commands={postEditorCommands}
        value={postContentText}
        onChange={setPostContentText}
        highlightEnable={false} // dis is veri buggi idk
        visiableDragbar={false} // dis dun allow resizing editor
        height={580}
      />
    </div>
  );
}

export default PostEditor;
