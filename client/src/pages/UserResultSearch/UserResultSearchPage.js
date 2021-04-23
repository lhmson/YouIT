import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import UserCard from "../../components/UserCard/UserCard";
import GroupCard from "../../components/GroupCard/GroupCard";
import { Button } from 'antd';
import SearchSidebar from "../../components/Sidebar/SearchSidebar/SearchSidebar";

const { Content } = Layout;
const { Title, Text } = Typography;

function UserResultSearchPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  function searchUserResult() {
    return (
      <>
        <div className="col-10 offset-1">
          <div className="row" style={{ background: "whitesmoke", height: 900, paddingTop: 16, paddingLeft: 32, marginLeft: 128, }}>
            <div className="col-6">
              <UserCard></UserCard>
              <UserCard></UserCard>
              <UserCard></UserCard>
              <UserCard></UserCard>
              <UserCard></UserCard>
            </div>
            <div className="col-6">
              <UserCard></UserCard>
              <UserCard></UserCard>
              <UserCard></UserCard>
              <UserCard></UserCard>
              <UserCard></UserCard>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Layout>
        <Navbar selectedMenu="userinfo" />
        <Layout>
          <SearchSidebar />
          <Layout style={styles.mainArea}>
            <Content>
              <div className="col-10 offset-1">
                <div className="row" style={{ background: "whitesmoke", height: 900, paddingTop: 16, paddingLeft: 32, marginLeft: 164, }}>
                  <div className="col-6">
                    <UserCard></UserCard>
                    <UserCard></UserCard>
                    <UserCard></UserCard>
                    <UserCard></UserCard>
                    <UserCard></UserCard>
                  </div>
                  <div className="col-6">
                    <GroupCard></GroupCard>
                    <GroupCard></GroupCard>
                    <GroupCard></GroupCard>
                    <GroupCard></GroupCard>
                    <GroupCard></GroupCard>
                  </div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default UserResultSearchPage;
