import React from "react";
import styles from "./styles.js";
import { Input } from "antd";

function CreateAGroupName({ name, setName }) {
  const handleChange = (value) => {
    setName(value.target.value);
  };

  return (
    <div>
      <Input
        name="groupName"
        placeholder="Group Name"
        value={name}
        onChange={handleChange}
      />
    </div>
  );
}

export default CreateAGroupName;
