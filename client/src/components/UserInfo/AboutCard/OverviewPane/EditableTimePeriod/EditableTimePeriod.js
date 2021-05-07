import React, { useState } from "react";

import { Button, Cascader, Input, Layout, Row, Typography } from "antd";

import { OverviewRow } from "../../index.js";
import { AiOutlineEdit } from "react-icons/all";

import styles from "./styles.js";

const { Text } = Typography;

function EditableTimePeriod({ firstIcon, text, subText, placeholder, onSave }) {
  const [isEditing, setIsEditing] = useState(false);

  var yearOptions = [];
  for (let y = new Date().getFullYear(); y >= 1900; y--) {
    yearOptions.push({
      value: y,
      label: y,
    });
  }

  const EditIcon = () => {
    return (
      <AiOutlineEdit style={styles.icon} onClick={() => setIsEditing(true)} />
    );
  };

  if (isEditing) {
    return (
      <Layout style={styles.whiteBackground}>
        <Input placeholder={placeholder} style={styles.input}></Input>
        <Text style={styles.text}>Time period</Text>
        <Row>
          <Cascader
            style={styles.cascader}
            placeholder="From"
            options={yearOptions}
          ></Cascader>
          <Cascader
            style={styles.cascader}
            placeholder="To"
            options={yearOptions}
          ></Cascader>
        </Row>
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

export default EditableTimePeriod;
