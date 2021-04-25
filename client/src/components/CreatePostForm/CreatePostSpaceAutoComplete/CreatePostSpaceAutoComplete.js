import React from 'react'
import { AutoComplete } from 'antd'
import styles from './styles.js';

function CreatePostSpaceAutoComplete({ setPostSpace }) {
  const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];
  const filterOption = (inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1

  const handlePostSpaceChange = (value) => {
    setPostSpace(value)
  }

  return (
    <div>
      <AutoComplete
        options={options}
        style={{ width: "15vw" }}
        placeholder="News feed"
        filterOption={filterOption}
        onChange={handlePostSpaceChange}
      />
    </div>
  )
}

export default CreatePostSpaceAutoComplete