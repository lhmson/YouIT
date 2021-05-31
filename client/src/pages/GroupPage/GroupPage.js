import { Layout, Row, Col } from "antd";
import Sider from "antd/lib/layout/Sider";
import React, { createContext, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import {
  AdminGroupSidebar,
  CoverPhoto,
  FeedPosts,
  GroupAboutCard,
  GroupBasicInfo,
  GroupFunctionButtons,
  GroupMenu,
  Navbar,
  GroupMember,
} from "../../components/index.js";
import { useLocation } from "react-router";
import styles from "./styles.js";
import * as api from "../../api/group";
import ListButtons from "../../components/GroupPage/ListButtons/ListButtons.js";
import MemberRequestsResult from "../RequestsInGroupsPage/MemberRequestsResult/MemberRequestsResult.js";
import PostRequestsResult from "../RequestsInGroupsPage/PostRequestsResult/PostRequestsResult.js";
const { Content } = Layout;

export const GroupContext = createContext({
  group: {},
  setGroup: () => {},
});

function GroupPage(props) {
  const { id } = props.match.params;
  const location = useLocation();

  const [group, setGroup] = useState(null);
  const valueContext = { group, setGroup };

  const [modeSearch, setModeSearch] = useState("group");

  useEffect(async () => {
    await fetchGroupInfo();
    //console.log(group);
  }, []);

  const fetchGroupInfo = async () => {
    const { data } = await api.fetchAGroup(id);
    setGroup(data);
  };

  return (
    <GroupContext.Provider value={valueContext}>
      <Layout>
        <Navbar />
        <Sider>
          <AdminGroupSidebar setModeSearch={setModeSearch} />
        </Sider>
        <Layout style={styles.mainArea}>
          <Content>
            {modeSearch === "memberRequests" ? (
              <MemberRequestsResult />
            ) : modeSearch === "group" ? (
              <Col>
                <Layout style={styles.avatarView}>
                  <Content
                    className="container"
                    style={{
                      padding: 8,
                    }}
                  >
                    <CoverPhoto />
                    <Row
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* <Button type="primary" style={styles.button}>
                  Create Post
                </Button>
                <Button type="primary" style={styles.button}>
                  Invite
                </Button>
                <Button
                  type="primary"
                  style={styles.button}
                  onClick={() => {
                    // handleDeleteGroup(id); */}

                      <GroupBasicInfo />
                      <GroupFunctionButtons />
                    </Row>
                    <Row style={{ justifyContent: "space-between" }}>
                      <GroupMenu />
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          // >>>>>>> 098a8ac7966c917f19624865c1d0397ae2264172
                        }}
                      >
                        <GoSearch
                          size={24}
                          style={styles.icon}
                          onClick={() => {}}
                        />
                        <BsThreeDots size={24} style={styles.icon} />
                      </Row>
                    </Row>
                  </Content>
                </Layout>
                <Layout style={styles.mainArea}>
                  <Content>
                    <Layout className="container">
                      {location.pathname === `/group/${group?._id}` ? (
                        <FeedPosts />
                      ) : location.pathname === `/group/${group?._id}/about` ? (
                        <GroupAboutCard />
                      ) : (
                        <GroupMember />
                      )}
                    </Layout>
                  </Content>
                </Layout>
              </Col>
            ) : (
              <PostRequestsResult />
            )}
          </Content>
        </Layout>
      </Layout>
    </GroupContext.Provider>
  );
}

export default GroupPage;
