import React, { useState } from "react";

import { Button, Cascader, Input, Layout, Row, Typography } from "antd";

import { OverviewRow } from "../../index.js";
import { AiOutlineEdit } from "react-icons/all";

import styles from "./styles.js";

const { Text } = Typography;

function EditableCombobox({
  firstIcon,
  text,
  subText,
  options,
  onSave,
  onChange,
  setPreviousState,
  editable,
  placeholder,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const EditIcon = () => {
    if (editable) {
      return (
        <AiOutlineEdit style={styles.icon} onClick={() => setIsEditing(true)} />
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
        <Cascader
          style={styles.cascader}
          options={options}
          defaultValue={[text]}
          onChange={(value, selectedOptions) => onChange(value)}
        ></Cascader>
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

export default EditableCombobox;
