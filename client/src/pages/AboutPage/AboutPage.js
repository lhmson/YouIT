import React from "react";
import { Layout, Typography } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import AboutCard from "../../components/UserInfo/AboutCard/AboutCard";
import AvatarView from "../../components/UserInfo/AvatarView/AvatarView.js";
import ListButtons from "../../components/UserInfo/ListButtons/ListButtons.js";
import FriendManager from "../../components/UserInfo/FriendManager/FriendManager.js";

const { Content } = Layout;
const { Title, Text } = Typography;

function AboutPage() {
  return (
    <>
      <Layout>
        <Navbar selectedMenu="userinfo" />
        <Layout style={styles.mainArea}>
          <Content
            className="container"
            style={{
              padding: 16,
            }}
          >
            <AvatarView displayName="Thao cute dang yeu"></AvatarView>
            <ListButtons />
            <AboutCard></AboutCard>
            <FriendManager />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AboutPage;
