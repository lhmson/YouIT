import { Layout, Row } from "antd";
import React, { createContext, useEffect, useState } from "react";
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
import * as api from "../../api/group";
import MemberRequestsResult from "../RequestsInGroupsPage/MemberRequestsResult/MemberRequestsResult.js";
import PostRequestsResult from "../RequestsInGroupsPage/PostRequestsResult/PostRequestsResult.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { useHistory } from "react-router";
import styles from "./styles.js";
import "./styles.css";

import SettingView from "../../components/GroupPage/SettingView/SettingView.js";
const { Content } = Layout;
export const GroupContext = createContext({
  group: {},
  setGroup: () => {},
});

function GroupPage(props) {
  const { id, menu } = props.match.params;
  const location = useLocation();
  const [group, setGroup] = useState(null);
  const valueContext = { group, setGroup };
  const [user, setUser] = useLocalStorage("user");
  const history = useHistory();

  useEffect(() => {
    async function fetchGroupInfo() {
      await api
        .fetchAGroup(id)
        .then((res) => {
          setGroup(res.data);
        })
        .catch((error) => {
          if (error.response?.status === 404) history.push("/error404");
        });
    }
    fetchGroupInfo();
    //console.log(group);
  }, []);

  return (
    <GroupContext.Provider value={valueContext}>
      <Layout>
        <Navbar selectedMenu="feed" />
        <Layout style={styles.mainArea}>
          <div className="feed-container">
            <AdminGroupSidebar
              className="sidebar"
              // setModeSearch={setModeSearch}
            />
            <div
              className="mainContent"
              id="scrollableDiv"
              style={{ minWidth: "87vw" }}
            >
              {menu === "member_requests" ? (
                <MemberRequestsResult />
              ) : menu === "review_posts" ? (
                <PostRequestsResult />
              ) : menu === "setting" ? (
                <SettingView />
              ) : (
                <div>
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
                        <GroupBasicInfo />
                        <GroupFunctionButtons />
                      </Row>
                      <Row style={{ justifyContent: "space-between" }}>
                        <GroupMenu />
                      </Row>
                    </Content>
                  </Layout>
                  <Layout>
                    <Content>
                      <Layout className="container">
                        {location.pathname === `/group/${group?._id}/main` ? (
                          <FeedPosts
                            limitPagination={5}
                            space="group"
                            groupId={group?._id}
                          />
                        ) : location.pathname ===
                          `/group/${group?._id}/about` ? (
                          <GroupAboutCard />
                        ) : (
                          <GroupMember />
                        )}
                      </Layout>
                    </Content>
                  </Layout>
                </div>
              )}
            </div>
          </div>
        </Layout>
      </Layout>
    </GroupContext.Provider>
  );
}

export default GroupPage;
