import { Layout, Typography } from "antd";
import React from "react";
import styles from "./styles.js";

const { Title, Text } = Typography;

function GroupBasicInfo() {
  return (
    <>
      <Layout style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>
          T2Team Community
        </Text>
        <Text style={{ fontSize: 16 }}>Public group</Text>
      </Layout>
    </>
  );
}

export default GroupBasicInfo;
