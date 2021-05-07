import React, { useState } from "react";

import {
  Button,
  Cascader,
  DatePicker,
  Input,
  Layout,
  Row,
  Typography,
} from "antd";

import { OverviewRow } from "../../index.js";
import { AiOutlineEdit } from "react-icons/all";

import styles from "./styles.js";

const { Text } = Typography;

function EditableTime({ firstIcon, text, subText, onSave }) {
  const [isEditing, setIsEditing] = useState(false);

  const EditIcon = () => {
    return (
      <AiOutlineEdit style={styles.icon} onClick={() => setIsEditing(true)} />
    );
  };

  const onDateChanged = () => {};

  if (isEditing) {
    return (
      <Layout style={styles.whiteBackground}>
        <DatePicker style={styles.datePicker} onChange={onDateChanged()} />
        <Row style={{ justifyContent: "flex-end" }}>
          <Button style={styles.button} onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button
            className="green-button"
            style={styles.button}
            onClick={onSave()}
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

export default EditableTime;
