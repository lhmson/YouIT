import { Select } from 'antd';
import React from 'react'
import styles from './styles.js';

const { Option } = Select

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

function CreatePostTagSelect() {
  return (
    <>
      <Select
        mode="tags"
        // size={size}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        {children}
      </Select>
    </>
  )
}

export default CreatePostTagSelect