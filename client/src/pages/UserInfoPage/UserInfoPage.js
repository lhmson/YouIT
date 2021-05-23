import React, { useState, useEffect } from "react";
import { Button, Col, Layout, Row } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";
import {
  AvatarView,
  ListButtons,
  IntroCard,
  FeedPosts,
} from "../../components/index";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUser } from "../../redux/actions/user.js";

const { Content } = Layout;

function UserInfoPage() {
  let { id } = useParams();

  const [currentId, setCurrentId] = useState(null);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  return (
    <>
      <Layout>
        <Navbar />
        <Layout style={styles.avatarView}>
          <Content
            className="container"
            style={{
              padding: 8,
            }}
          >
            <AvatarView></AvatarView>
            <ListButtons />
          </Content>
        </Layout>
        <Layout style={styles.mainArea}>
          <Content className="container">
            <Row>
              <Col span={8}>
                <IntroCard />
              </Col>
              <Col span={16}>
                <FeedPosts />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default UserInfoPage;
