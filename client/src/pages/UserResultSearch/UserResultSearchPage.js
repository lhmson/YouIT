import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import UserCard from "../../components/UserCard/UserCard";
import GroupCard from "../../components/GroupCard/GroupCard";
import { Button } from "antd";
import SearchSidebar from "../../components/Sidebar/SearchSidebar/SearchSidebar";
import SearchUserResult from "../../components/SearchResults/SearchUserResult/SearchUserResult";
import SearchGroupResult from "../../components/SearchResults/SearchGroupResult/SearchGroupResult";
import MemberRequest from "../../components/MemberRequest/MemberRequest";
import SearchPostResult from "../../components/SearchResults/SearchPostResult/SearchPostResult";
import { useLocation } from "react-router";

const { Content } = Layout;
const { Title, Text } = Typography;

function UserResultSearchPage() {
  const location = useLocation();
  const txtInitSearch = location.state?.txtSearch;

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [modeSearch, setModeSearch] = useState("User");
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
              ) : (
                <SearchGroupResult></SearchGroupResult>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default UserResultSearchPage;
