import React from 'react'
import { Input } from 'antd'
import createPostStyle from "../styles.js"
import * as constants from '../constant.js'

function CreatePostOverviewInput({ overview, setOverview }) {
  const handleTextChange = (value) => {
    setOverview(value.target.value?.replace("\n", ""));
  };

  return (
    <div>
      <Input.TextArea
        placeholder="// Brief overview"
        rows={3}
        value={overview}
        onChange={handleTextChange}
        style={createPostStyle.editorFont}
        maxLength={constants.MAX_LENGTH_OVERVIEW}
        showCount
      />
    </div>
  )
}

export default CreatePostOverviewInput