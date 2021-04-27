import React from 'react'
import MDEditor from '@uiw/react-md-editor'

import styles from './styles.js';
import { postEditorCommands } from './commands.js';

function PostEditor({ postContent, setPostContent }) {
  if (postContent === null || postContent === undefined || !setPostContent)
    return (
      <div>
        <p>
          postContent and setPostContent is required!
        </p>
      </div>
    )

  return (
    <div>
      <MDEditor
        commands={postEditorCommands}
        value={postContent}
        onChange={setPostContent}
        highlightEnable={false} // dis is veri buggi idk
        visiableDragbar={false} // dis dun allow resizing editor
        height={580}
      />
    </div>
  )
}

export default PostEditor