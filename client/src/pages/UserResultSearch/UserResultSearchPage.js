import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import UserCard from "../../components/UserCard/UserCard";
import GroupCard from "../../components/GroupCard/GroupCard";
import { Button } from "antd";
import SearchSidebar from "../../components/Sidebar/SearchSidebar/SearchSidebar";
import SearchUserResult from "../../components/SearchResults/SearchUserResult/SearchUserResult";
import SearchGroupResult from "../../components/SearchResults/SearchGroupResult/SearchGroupResult";

const { Content } = Layout;
const { Title, Text } = Typography;

function UserResultSearchPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [modeSearch, setModeSearch] = useState("User");

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      <Layout>
        <Navbar selectedMenu="userinfo" />
        <Layout>
          <SearchSidebar setModeSearch={setModeSearch} />
          <Layout style={styles.mainArea}>
            <Content>
              {modeSearch === "User" ? (
                <SearchUserResult></SearchUserResult>
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
