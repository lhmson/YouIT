import React from "react";
import styles from "./styles.js";
import { Input } from "antd";

function CreateAGroupDescription({ description, setDescription }) {
  const handleChangeDescription = (value) => {
    setDescription(value.target.value);
  };

  return (
    <div>
      <Input
        name="description"
        placeholder="Description"
        value={description}
        onChange={handleChangeDescription}
        style={{ height: 150 }}
      />
    </div>
  );
}

export default CreateAGroupDescription;
