import React, { useState, useEffect } from "react";
import { Layout, Typography } from "antd";
import styles from "./styles.js";
import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import FeedSidebar from "../../components/Sidebar/FeedSidebar/FeedSidebar";
import FeedPosts from "../../components/Posts/FeedPosts/FeedPosts";

const { Content } = Layout;

function FeedPage() {
  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <FeedSidebar />
          <Layout style={styles.mainArea}>
            <Content>
              <FeedPosts />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default FeedPage;
