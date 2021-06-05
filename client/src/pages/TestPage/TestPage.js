import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb } from "antd";
import styles from "./styles.js";

import Posts from "../../components/Posts/Posts_deprecated";
import InputForm from "../../components/InputForm/InputForm";
import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/FeedSidebar/FeedSidebar";

const { Content } = Layout;

function TestPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <Sidebar />
          <Layout style={{ ...styles.mainArea }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Posts setCurrentId={setCurrentId} />
            <InputForm currentId={currentId} setCurrentId={setCurrentId} />

            <Content style={{ ...styles.paleBackground }}>Content</Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default TestPage;
