import React from "react";
import { Layout, Row, Typography, Col } from "antd";
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
        <Navbar />
        <Layout style={styles.mainArea}>
          <Content
            className="container"
            style={{
              padding: 16,
            }}
          >
            <AvatarView displayName="Thao cute dang yeu"></AvatarView>
            <Row>
              <Col span={12}>
                <ListButtons />
              </Col>
            </Row>
            <AboutCard></AboutCard>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AboutPage;
