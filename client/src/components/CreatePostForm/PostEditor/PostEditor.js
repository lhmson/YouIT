import React from 'react'
import MDEditor from "@uiw/react-md-editor";
import styles from './styles.js';

function PostEditor() {
  const [postContent, setPostContent] = React.useState("**Hello world!!!**");
  return (
    <div>
      <MDEditor
        value={postContent}
        onChange={setPostContent}
        highlightEnable={false} // dis is veri buggi idk
        visiableDragbar={false} // dis dun allow resizing editor
      />
    </div>
  )
}

export default PostEditor