import React, { useState } from "react";

import { Button, Input, Layout, Row, Typography } from "antd";

import { OverviewRow } from "../../index.js";
import { AiOutlineEdit } from "react-icons/all";

import styles from "./styles.js";

const { Text } = Typography;

// setPreviousState is used after changing your state via onChange and then cancel, don't save

function EditableText({
  firstIcon,
  text,
  subText,
  placeholder,
  onSave,
  onChange,
  setPreviousState,
  editable,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const EditIcon = () => {
    if (editable) {
      return (
        <AiOutlineEdit
          className="clickable"
          style={styles.icon}
          onClick={() => setIsEditing(true)}
        />
      );
    }
    return <></>;
  };

  const handleSaving = () => {
    onSave();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreviousState();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Layout style={styles.whiteBackground}>
        <Text style={styles.text}>{placeholder}</Text>
        <Input
          placeholder={placeholder}
          style={styles.input}
          defaultValue={text}
          onChange={(value) => onChange(value)}
        />
        <Row style={{ justifyContent: "flex-end" }}>
          <Button style={styles.button} onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className="green-button"
            style={styles.button}
            onClick={handleSaving}
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
