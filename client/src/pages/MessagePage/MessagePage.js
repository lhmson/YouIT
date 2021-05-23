import React, { useState, useEffect } from "react";
import { Layout, Typography } from "antd";
import styles from "./styles.js";
import Navbar from "../../components/Navbar/Navbar";

import FeedPosts from "../../components/Posts/FeedPosts/FeedPosts";
import { MessageSidebar } from "../../components/index";

const { Content } = Layout;

function MessagePage() {
  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          {/* <MessageSidebar /> */}
          <Layout style={styles.mainArea}>
            <Content></Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default MessagePage;
