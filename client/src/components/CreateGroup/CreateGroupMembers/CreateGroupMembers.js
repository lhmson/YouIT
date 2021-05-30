import { Select } from "antd";
import React from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

import styles from "./styles.js";

const { Option } = Select;

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

function CreateGroupMembers() {
  console.log("Thycute");
  const [user] = useLocalStorage("user");
  const array = [];
  //array = user?.listFriends;
  const children = [];
  console.log(array.length);
  // for (let i = 0; i < user?.result.listFriends.length; i++) {
  //   children.push(
  //     <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
  //   );
  // }
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
