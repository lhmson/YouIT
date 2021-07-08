import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import styles from "../styles.js";
import Navbar from "../../../components/Navbar/Navbar";
import "../styles.css";

import SystemAdminSidebar from "../../../components/Sidebar/SystemAdminSidebar/SystemAdminSidebar";
import { StatisticsPage } from "../../index.js";
import UserAdminManagement from "../UserAdminManagement/UserAdminManagement.js";
import GroupAdminManagement from "../GroupAdminManagement/GroupAdminManagement.js";
import ErrorPage from "../../ErrorPage/ErrorPage.js";
import * as apiAuth from "../../../api/auth";
import { Loading } from "../../../components/index.js";

function AdminDashboardPage(props) {
  const { menu } = props.match.params;

  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //TODO: handle set login admin
    setLoading(true);
    apiAuth
      .checkAdminSystem()
      .then((res) => {
        console.log("res auth dashboard", res.data.isAdmin);

        setIsAdmin(res.data.isAdmin);
      })
      .catch((error) => {
        console.log("Error getting is admin", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      {loading ? (
        <Loading />
      ) : (
        <>
          {isAdmin ? (
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
          ) : (
            <ErrorPage code="403" />
          )}
        </>
      )}
    </>
  );
}

export default AdminDashboardPage;
