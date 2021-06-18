import React, { useEffect } from "react";
import { Layout } from "antd";
import styles from "../styles.js";
import Navbar from "../../../components/Navbar/Navbar";
import "../styles.css";

import { FeedPosts } from "../../../components/index";
import SystemAdminSidebar from "../../../components/Sidebar/SystemAdminSidebar/SystemAdminSidebar";

const { Content } = Layout;

function AdminDashboardPage() {
  return (
    <>
      <Layout>
        <Navbar />
        <Layout style={styles.mainArea}>
          <div className="feed-container">
            <SystemAdminSidebar className="sidebar" />
            <div className="mainContent" id="scrollableDiv">
              <FeedPosts space="news_feed" />
            </div>
          </div>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminDashboardPage;
