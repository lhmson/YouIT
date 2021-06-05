import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";
import "./styles.css";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import SearchSidebar from "../../components/Sidebar/SearchSidebar/SearchSidebar";
import SearchUserResult from "../../components/SearchResults/SearchUserResult/SearchUserResult";
import SearchGroupResult from "../../components/SearchResults/SearchGroupResult/SearchGroupResult";
import SearchPostResult from "../../components/SearchResults/SearchPostResult/SearchPostResult";
import SearchAllResult from "../../components/SearchResults/SearchAllResult/SearchAllResult";
import { useLocation } from "react-router";

const { Content } = Layout;
const { Title, Text } = Typography;

function UserResultSearchPage() {
  const location = useLocation();
  const txtInitSearch = location.state?.txtSearch;

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [modeSearch, setModeSearch] = useState("All");
  const [txtSearch, setTxtSearch] = useState(txtInitSearch ?? "");

  return (
    <>
      <Layout>
        <Navbar
          selectedMenu="userinfo"
          setTxtSearch={setTxtSearch}
          setModeSearch={setModeSearch}
          txtInitSearch={txtInitSearch}
        />
        <Layout>
          <SearchSidebar setModeSearch={setModeSearch} />
          <Layout style={styles.mainArea}>
            <Content>
              {modeSearch === "User" ? (
                <SearchUserResult userNameSearch={txtSearch}></SearchUserResult>
              ) : modeSearch === "Post" ? (
                <SearchPostResult txtSearch={txtSearch}></SearchPostResult>
              ) : modeSearch === "Group" ? (
                <SearchGroupResult txtSearch={txtSearch}></SearchGroupResult>
              ) : (
                <SearchAllResult txtSearch={txtSearch}></SearchAllResult>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>

      {/* <Layout>
        <Navbar
          selectedMenu="userinfo"
          setTxtSearch={setTxtSearch}
          setModeSearch={setModeSearch}
          txtInitSearch={txtInitSearch}
        />
        <Layout style={styles.mainArea}>
          <div className="feed-container">
            <SearchSidebar setModeSearch={setModeSearch} className="sidebar" />
            <div className="mainContent">
              {modeSearch === "User" ? (
                <SearchUserResult userNameSearch={txtSearch}></SearchUserResult>
              ) : modeSearch === "Post" ? (
                <SearchPostResult txtSearch={txtSearch}></SearchPostResult>
              ) : modeSearch === "Group" ? (
                <SearchGroupResult txtSearch={txtSearch}></SearchGroupResult>
              ) : (
                <SearchAllResult txtSearch={txtSearch}></SearchAllResult>
              )}
            </div>
          </div>
        </Layout>
      </Layout> */}
    </>
  );
}

export default UserResultSearchPage;
