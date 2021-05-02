import React, { useEffect, useState } from "react";
import { Layout, Row, Typography, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import {
  AboutCard,
  AvatarView,
  ListButtons,
  FriendManager,
} from "../../components/index";

import * as api from "../../api/user_info";

const { Content } = Layout;

function AboutPage() {
  const [user, setUser] = useState(null);

  const handleFetchUserInfo = (user) => {
    setUser(user);
  };

  useEffect(async () => {
    console.log("start fetching user");

    const localUserInfo = JSON.parse(localStorage.getItem("user"));
    const user = await api.fetchUserInfo(localUserInfo?.result?._id);

    console.log("user:: ", user.data);
    handleFetchUserInfo(user.data);
  }, []);

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
            <AvatarView user={user}></AvatarView>
            <Row>
              <Col span={12}>
                <ListButtons />
              </Col>
            </Row>
            <AboutCard user={user}></AboutCard>
            <FriendManager></FriendManager>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AboutPage;
