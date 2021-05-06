import React, { useState } from "react";

import { Button, Cascader, Input, Layout, Row, Typography } from "antd";

import { OverviewRow } from "../../index.js";
import { AiOutlineEdit } from "react-icons/all";

import styles from "./styles.js";

const { Text } = Typography;

function EditableText({ firstIcon, text, subText, placeholder }) {
  const [isEditing, setIsEditing] = useState(false);

  const EditIcon = () => {
    return (
      <AiOutlineEdit style={styles.icon} onClick={() => setIsEditing(true)} />
    );
  };

  const saveCurrentCity = () => {};

  if (isEditing) {
    return (
      <Layout style={styles.whiteBackground}>
        <Input
          placeholder={placeholder}
          style={styles.input}
          defaultValue={text}
        ></Input>
        <Row style={{ justifyContent: "flex-end" }}>
          <Button style={styles.button} onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button
            className="green-button"
            style={styles.button}
            onClick={saveCurrentCity()}
          >
            Save
          </Button>
        </Row>
      </Layout>
    );
  }
  // text voi subText o day lay tu user trong local storage
  return (
    <OverviewRow
      firstIcon={firstIcon}
      text={text}
      subText={subText}
      lastIcon={<EditIcon />}
    />
  );
}

export default EditableText;
