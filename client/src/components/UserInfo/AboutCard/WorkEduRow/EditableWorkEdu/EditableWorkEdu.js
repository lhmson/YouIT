import React, { useState } from "react";

import { Button, Input, Layout, Row, Typography } from "antd";

import { OverviewRow } from "../../index.js";
import { AiOutlineEdit, FaRegTrashAlt } from "react-icons/all";

import styles from "./styles.js";

const { Text } = Typography;

// setPreviousState is used after changing your state via onChange and then cancel, don't save

function EditableWorkEdu({
  firstIcon,
  text,
  subText,
  placeholder,
  onSave,
  onTextChange,
  onSubTextChange,
  setPreviousState,
  editable,
  index,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const EditIcon = () => {
    if (editable) {
      return (
        <Row>
          <AiOutlineEdit
            className="clickable"
            style={styles.icon}
            onClick={() => setIsEditing(true)}
          />
          <FaRegTrashAlt style={styles.iconDelete} onClick={onDelete} />
        </Row>
      );
    }
    return <></>;
  };

  const handleSaving = () => {
    onSave();
    setIsEditing(false);
  };

  const handleCancel = () => {
    //setPreviousState();
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
          onChange={(value) => onTextChange(index, value)}
        ></Input>
        <Input
          placeholder={placeholder}
          style={styles.input}
          defaultValue={subText}
          onChange={(value) => onSubTextChange(index, value)}
        ></Input>
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
  // text is work location or college
  // subText is work position or major
  return (
    <OverviewRow
      firstIcon={firstIcon}
      text={text}
      subText={subText}
      lastIcon={<EditIcon />}
    />
  );
}

export default EditableWorkEdu;
