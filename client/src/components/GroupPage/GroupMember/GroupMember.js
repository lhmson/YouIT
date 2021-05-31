import { Button, Divider, Layout, Row, Typography } from "antd";
import React, { useContext } from "react";
import { IoMdLock } from "react-icons/all";
import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";
import { OverviewRow } from "../../UserInfo/AboutCard/index.js";
import MemberCard from "./MemberCard/MemberCard.js";
import styles from "./styles.js";

const { Text } = Typography;

function GroupMember() {
  const { group } = useContext(GroupContext);

  return (
    <>
      <Layout style={{ padding: 32, background: "white" }}>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Member</Text>
        <Layout style={{ paddingLeft: 32, background: "white" }}>
          <MemberCard />
        </Layout>
      </Layout>
    </>
  );
}

export default GroupMember;
