import React, { useEffect } from "react";
import { Layout } from "antd";
import styles from "./styles.js";
import Navbar from "../../components/Navbar/Navbar";
import "./styles.css";

import FeedSidebar from "../../components/Sidebar/FeedSidebar/FeedSidebar";
import { FeedPosts } from "../../components/index.js";

const { Content } = Layout;

function FeedPage() {
  return (
    <>
      <Layout>
        <Navbar />
        <Layout style={styles.mainArea}>
          <div className="feed-container">
            <FeedSidebar className="sidebar" />
            <div className="mainContent" id="scrollableDiv">
              <FeedPosts space="news_feed" />
            </div>
          </div>
        </Layout>
      </Layout>
    </>
  );
}

export default FeedPage;
