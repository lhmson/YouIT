import React from 'react'
import styles from './styles.js';
import { Input } from 'antd';

function CreatePostTitleInput({ title, setTitle }) {
  const handleTextChange = (value) => {
    setTitle(value.target.value);
  }

  return (
    <div>
      <Input
        value={title}
        onChange={handleTextChange}
      />
    </div>
  )
}

export default CreatePostTitleInput