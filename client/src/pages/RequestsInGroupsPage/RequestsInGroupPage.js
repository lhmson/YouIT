import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import UserCard from "../../components/UserCard/UserCard";
import GroupCard from "../../components/GroupCard/GroupCard";
import { Button } from "antd";
import AdminGroupSidebar from "../../components/Sidebar/AdminGroupSidebar/AdminGroupSidebar";
// import SearchUserResult from "../../components/SearchResults/SearchUserResult/SearchUserResult";
// import SearchGroupResult from "../../components/SearchResults/SearchGroupResult/SearchGroupResult";
// import MemberRequest from "../../components/MemberRequest/MemberRequest";
// import SearchPostResult from "../../components/SearchResults/SearchPostResult/SearchPostResult";
import MemberRequestsResult from "./MemberRequestsResult/MemberRequestsResult.js";
import PostRequestsResult from "./PostRequestsResult/PostRequestsResult.js";
import { useParams } from "react-router";
const { Content } = Layout;
const { Title, Text } = Typography;

function RequestsInGroupPage({ modeSearch }) {
  // const [currentId, setCurrentId] = useState(null);
  // const dispatch = useDispatch();
  // const [modeSearch, setModeSearch] = useState("User");

  const { id } = useParams();
  console.log(id);
  // nen load lai data tao them group context o day
  // hay quang requestpage vo group page?

  return (
    <>
      <Layout>
        {/* <AdminGroupSidebar setModeSearch={setModeSearch} /> */}
        <Layout style={styles.mainArea}>
          <Content>
            {modeSearch === "approvePosts" ? (
              <PostRequestsResult></PostRequestsResult>
            ) : modeSearch === "memberRequests" ? (
              <MemberRequestsResult></MemberRequestsResult>
            ) : (
              <Text></Text>
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default RequestsInGroupPage;
