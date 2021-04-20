import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import AboutCard from "../../components/AboutCard/AboutCard";

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
        <Layout style={{ margin: 128, background: "purple" }}>
          <Content style={{ background: "white", padding: 16 }}>
            <AboutCard></AboutCard>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default UserInfoPage;
