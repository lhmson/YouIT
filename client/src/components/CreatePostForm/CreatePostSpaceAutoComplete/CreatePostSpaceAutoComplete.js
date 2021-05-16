import React from "react";
import { AutoComplete } from "antd";
import styles from "./styles.js";

function CreatePostSpaceAutoComplete({ setPostSpace }) {
  const options = [
    { value: "Burns Bay Road" },
    { value: "Downing Street" },
    { value: "Wall Street" },
  ];
  const filterOption = (inputValue, option) =>
    option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

  const handlePostSpaceChange = (value) => {
    setPostSpace(value);
  };

  return (
    <div>
      <AutoComplete
        className="green"
        options={options}
        style={{ width: "100%" }}
        placeholder="My wall"
        filterOption={filterOption}
        onChange={handlePostSpaceChange}
      />
    </div>
  );
}

export default CreatePostSpaceAutoComplete;
