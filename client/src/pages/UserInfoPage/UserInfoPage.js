import React, { useState, useEffect } from "react";
import { Col, Layout, Row } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";
import {
  AboutCard,
  AvatarView,
  ListButtons,
  FriendManager,
} from "../../components/index";

import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";

const { Content } = Layout;

function UserInfoPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      <Layout>
        <Navbar selectedMenu="userinfo" />
        <Layout style={styles.mainArea}>
          <Content className="container" style={{ padding: 16 }}>
            <AvatarView displayName="Thao cute dang yeu"></AvatarView>
            <Row>
              <Col span={12}>
                <ListButtons />
              </Col>
            </Row>
            <AboutCard></AboutCard>
            <FriendManager />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default UserInfoPage;
