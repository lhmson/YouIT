import React, { useState } from "react";

import { Button, Cascader, Input, Layout, Row, Typography } from "antd";

import { OverviewRow } from "../../index.js";
import { AiOutlineEdit } from "react-icons/all";

import styles from "./styles.js";

const { Text } = Typography;

function EditableCombobox({ firstIcon, text, subText, options }) {
  const [isEditing, setIsEditing] = useState(false);

  const EditIcon = () => {
    return (
      <AiOutlineEdit style={styles.icon} onClick={() => setIsEditing(true)} />
    );
  };

  const saveGender = () => {};

  if (isEditing) {
    return (
      <Layout style={styles.whiteBackground}>
        <Cascader style={styles.cascader} options={options}></Cascader>
        <Row style={{ justifyContent: "flex-end" }}>
          <Button style={styles.button} onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button
            className="green-button"
            style={styles.button}
            onClick={saveGender()}
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
