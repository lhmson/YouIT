import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

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
