import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb } from "antd";
import TextEditor from "../../components/TextEditor/TextEditor";
import styles from "./styles.js";

import Posts from "../../components/Posts/Posts";
import InputForm from "../../components/InputForm/InputForm";
import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import Sidebar from "../../components/Sidebar/Sidebar";

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
        <Navbar selectedMenu="home" />
        <Layout>
          <Sidebar />
          <Layout style={{ padding: "24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item> */}
            </Breadcrumb>
            <Posts setCurrentId={setCurrentId} />
            <InputForm currentId={currentId} setCurrentId={setCurrentId} />
            {/* <TextEditor /> */}
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
