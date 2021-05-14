import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import UserCard from "../../components/UserCard/UserCard";
import GroupCard from "../../components/GroupCard/GroupCard";
import { Button } from "antd";
import GroupSidebar from "../../components/Sidebar/GroupSidebar/GroupSidebar";
// import SearchUserResult from "../../components/SearchResults/SearchUserResult/SearchUserResult";
// import SearchGroupResult from "../../components/SearchResults/SearchGroupResult/SearchGroupResult";
// import MemberRequest from "../../components/MemberRequest/MemberRequest";
// import SearchPostResult from "../../components/SearchResults/SearchPostResult/SearchPostResult";
import MemberRequestsResult from "./MemberRequestsResult/MemberRequestsResult.js";
import PostRequestsResult from "./PostRequestsResult/PostRequestsResult.js";
const { Content } = Layout;
const { Title, Text } = Typography;

function UserResultSearchPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [modeSearch, setModeSearch] = useState("User");

  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <GroupSidebar setModeSearch={setModeSearch} />
          <Layout style={styles.mainArea}>
            <Content>
              {modeSearch === "User" ? (
                <PostRequestsResult></PostRequestsResult>
              ) : modeSearch === "Post" ? (
                <MemberRequestsResult></MemberRequestsResult>
              ) : (
                <Text></Text>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default UserResultSearchPage;
