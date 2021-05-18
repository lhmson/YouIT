import React, { useEffect, useState } from "react";
import { Typography, Button, List, Row } from "antd";
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
  onChange,
  setPreviousState,
  editable,
}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

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

  return (
    <Row
      style={{ display: "flex", flexDirection: "column", background: "pink" }}
    >
      <Title level={3}>{heading}</Title>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <EditableWorkEdu
              text={heading === "Work" ? item?.location : item?.schoolName}
              firstIcon={firstIcon}
              subText={heading === "Work" ? item?.position : item?.moreInfo}
              placeholder={placeholder}
              onSave={onSave}
              onChange={onChange}
              setPreviousState={setPreviousState}
              editable={editable}
            />
          </List.Item>
        )}
      ></List>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button className="clickable" type="link" size="large">
          <GrAddCircle style={styles.icon} color="blue" />
          {addingText}
        </Button>
      </div>
    </Row>
  );
}

export default WorkEduRow;
