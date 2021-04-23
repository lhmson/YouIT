import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import AboutCard from "../../components/UserInfo/AboutCard/AboutCard";
import AvatarView from "../../components/UserInfo/AvatarView/AvatarView.js";
import ListButtons from "../../components/UserInfo/ListButtons/ListButtons.js";
import FriendManager from "../../components/UserInfo/FriendManager/FriendManager.js";

const { Content } = Layout;
const { Title, Text } = Typography;

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
          <Content
            className="container"
            style={{
              background: "red",
              padding: 16,
              // position: "relative",
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

export default UserInfoPage;
