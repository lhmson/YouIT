import React, { useEffect } from "react";
import { Layout } from "antd";
import styles from "../styles.js";
import Navbar from "../../../components/Navbar/Navbar";
import "../styles.css";

import SystemAdminSidebar from "../../../components/Sidebar/SystemAdminSidebar/SystemAdminSidebar";
import { StatisticsPage } from "../../index.js";
import UserAdminManagement from "../UserAdminManagement/UserAdminManagement.js";
import GroupAdminManagement from "../GroupAdminManagement/GroupAdminManagement.js";
import ErrorPage from "../../ErrorPage/ErrorPage.js";

const { Content } = Layout;

function AdminDashboardPage(props) {
  const { menu } = props.match.params;

  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    //TODO: handle set login admin
    return user.role === "Admin";
  };

  if (!isAdmin()) {
    return <ErrorPage code="403" />;
  }

  const SelectedManagementMenu = () => {
    switch (menu) {
      case "dashboard":
        return <StatisticsPage />;
      case "user":
        return <UserAdminManagement />;
      // case "post":
      //   return <PostRequestsResult />;
      case "group":
        return <GroupAdminManagement />;
      default:
    }
  };

  return (
    <>
      <Layout>
        <Navbar />
        <Layout style={styles.mainArea}>
          <div className="feed-container">
            <SystemAdminSidebar className="sidebar" selectedMenu={menu} />
            <div className="mainContent" id="scrollableDiv">
              <SelectedManagementMenu />
            </div>
          </div>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminDashboardPage;
