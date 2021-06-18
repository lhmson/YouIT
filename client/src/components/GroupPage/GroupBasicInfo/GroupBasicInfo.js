import { Col, Layout, Row, Tag, Typography } from "antd";
import React, { useContext } from "react";
import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";
import styles from "./styles.js";

const { Text } = Typography;

function GroupBasicInfo() {
  const { group } = useContext(GroupContext);

  return (
    <>
      <Col
        style={{
          marginBottom: 32,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{ fontSize: 16, marginBottom: 16 }}
        >{`${group?.privacy} Group`}</Text>
        <Text
          style={{ fontSize: 20, fontWeight: "bold" }}
        >{`#${group?.topic}`}</Text>
      </Col>
    </>
  );
}

export default GroupBasicInfo;
