import { Col, Layout, Typography } from "antd";
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
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>{group?.name}</Text>
        <Text style={{ fontSize: 16 }}>{`${group?.privacy} Group`}</Text>
      </Col>
    </>
  );
}

export default GroupBasicInfo;
