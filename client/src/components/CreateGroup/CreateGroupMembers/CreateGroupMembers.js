import { Select } from "antd";
import React from "react";
import styles from "./styles.js";

const { Option } = Select;

const children = [];

children.push(<Option></Option>);

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

function CreateGroupMembers() {
  return (
    <>
      <Select
        mode="tags"
        // size={size}
        placeholder="Invite your friends"
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        {children}
      </Select>
    </>
  );
}

export default CreateGroupMembers;
