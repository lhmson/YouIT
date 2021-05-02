import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/user.js";

import { Layout, Row, Typography, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import {
  AboutCard,
  AvatarView,
  ListButtons,
  FriendManager,
} from "../../components/index";

const { Content } = Layout;

function AboutPage() {
  //const [user, setUser] = useState(null);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // const handleFetchUserInfo = (user) => {
  //   setUser(user);
  // };

  useEffect(async () => {
    console.log("start fetching user");

    const localUserInfo = JSON.parse(localStorage.getItem("user"));
    dispatch(getUser(localUserInfo?.result?._id));

    //console.log("user:: ", user);
    //handleFetchUserInfo(user.data);
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
