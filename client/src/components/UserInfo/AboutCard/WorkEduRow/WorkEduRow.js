import React, { useEffect, useState } from "react";
import { Typography, Button, List, Row, Layout, Input } from "antd";
import { GrAddCircle, IoHome } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";

import EditableText from "../../AboutCard/OverviewPane/EditableText/EditableText";

import styles from "./styles.js";
import EditableWorkEdu from "./EditableWorkEdu/EditableWorkEdu";

const { Text, Title } = Typography;

function WorkEduRow({
  heading,
  addingText,
  firstIcon,
  text,
  subText,
  placeholder,
  onSave,
  onTextChange,
  onSubTextChange,
  onNewTextChange,
  onNewSubTextChange,
  onAdd,
  editable,
  onDelete,
}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    switch (heading) {
      case "Work":
        setData(user?.userInfo?.works);
        console.log(data);
        break;
      case "College":
        setData(user?.userInfo?.educations);
        console.log(data);
        break;
      default:
        break;
    }
    return () => {};
  }, [user]);

  const handleSaving = () => {
    onAdd();
    setIsAdding(false);
  };

  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Title level={3}>{heading}</Title>
      <List
        style={{ width: "100%" }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <EditableWorkEdu
              index={index}
              text={heading === "Work" ? item?.location : item?.schoolName}
              firstIcon={firstIcon}
              subText={heading === "Work" ? item?.position : item?.moreInfo}
              placeholder={placeholder}
              onSave={onSave}
              onTextChange={(index, value) => onTextChange(index, value)}
              onSubTextChange={(index, value) => onSubTextChange(index, value)}
              editable={editable}
              onDelete={() => onDelete(index)}
            />
          </List.Item>
        )}
      ></List>
      {isAdding ? (
        <Layout style={styles.whiteBackground}>
          <Text style={styles.text}>{placeholder}</Text>
          <Input
            placeholder={placeholder}
            style={styles.input}
            onChange={(value) => onNewTextChange(value)}
          ></Input>
          <Input
            placeholder={placeholder}
            style={styles.input}
            defaultValue={subText}
            onChange={(value) => onNewSubTextChange(value)}
          ></Input>
          <Row style={{ justifyContent: "flex-end" }}>
            <Button style={styles.button} onClick={() => setIsAdding(false)}>
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
      ) : (
        <></>
      )}
      {editable ? (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            className="clickable"
            type="link"
            size="large"
            onClick={() => setIsAdding(true)}
          >
            <GrAddCircle style={styles.icon} color="blue" />
            {addingText}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </Row>
  );
}

export default WorkEduRow;
