import { Button, Divider, Layout, Row, Typography } from "antd";
import React from "react";
import { IoMdLock } from "react-icons/all";
import { OverviewRow } from "../../UserInfo/AboutCard/index.js";
import styles from "./styles.js";

const { Text } = Typography;

function GroupAboutCard() {
  const groupDescription =
    "ZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzz zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzzZZZ zzz";

  // privacy row
  const PrivacyIcon = () => {
    return <IoMdLock style={styles.icon} />;
  };
  const privacyMode = "Public";
  const privacyDescription =
    "Anyone can see who's in the group and what they post.";

  return (
    <>
      <Layout style={{ marginBottom: 32, padding: 16, background: "white" }}>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>
          About this group
        </Text>
        <Layout style={{ paddingLeft: 32, background: "white" }}>
          <Divider style={{ justifySelf: "start" }}></Divider>
          <Text>{groupDescription}</Text>
          <Button type="text" style={{ background: "white", marginBottom: 32 }}>
            See more
          </Button>
          <Row>
            <OverviewRow
              firstIcon={<PrivacyIcon />}
              text={privacyMode}
              subText={privacyDescription}
            />
            <OverviewRow />
          </Row>
        </Layout>
      </Layout>
    </>
  );
}

export default GroupAboutCard;
