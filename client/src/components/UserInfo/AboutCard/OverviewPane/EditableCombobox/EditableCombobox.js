import React, { useState } from "react";

import { Button, Cascader, Input, Layout, Row, Select, Typography } from "antd";

import { OverviewRow } from "../../index.js";
import { AiOutlineEdit } from "react-icons/all";

import styles from "./styles.js";

const { Option } = Select;
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
      <div
        className="row"
        style={{ alignSelf: "center", justifyContent: "center" }}
      >
        <div
          style={{
            ...styles.whiteBackground,
            maxWidth: 1100,
            flex: 1,
          }}
        >
          <Text style={styles.text}>{placeholder}</Text>

          <Row style={{ justifyContent: "flex-end" }}>
            <Select
              style={{ ...styles.cascader, flex: 1 }}
              defaultValue={text}
              onChange={(value) => onChange(value)}
            >
              {options.map((option, index) => (
                <Option key={index} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Row>
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
        </div>
      </div>
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
