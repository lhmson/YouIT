import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb } from "antd";
import TextEditor from "../../components/TextEditor/TextEditor";
import styles from "./styles.js";

import Posts from "../../components/Posts/Posts";
import InputForm from "../../components/InputForm/InputForm";
import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import FeedSidebar from "../../components/Sidebar/FeedSidebar/FeedSidebar";

const { Content } = Layout;
const { Title, Text } = Typography;

function FeedPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      <Layout>
        <Navbar selectedMenu="feed" />
        <Layout>
          <FeedSidebar />
          <Layout style={{ padding: "24px" }}>
            <Content style={{ ...styles.paleBackground, ...styles.mainArea }}>
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default FeedPage;
