import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import AvatarView from "../../components/UserInfo/AvatarView/AvatarView.js";
import ListButtons from "../../components/UserInfo/ListButtons/ListButtons.js";
import IntroCard from "../../components/IntroCard/IntroCard.js";

const { Content } = Layout;
const { Title, Text } = Typography;

function WallPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      <Layout>
        <Layout style={styles.mainArea}>
          <Content
            className="container"
            // style={{
            //   padding: 16,
            // }}
          >
            <AvatarView displayName="Thy cute đáng iu"></AvatarView>
            <ListButtons />
            <IntroCard />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default WallPage;
