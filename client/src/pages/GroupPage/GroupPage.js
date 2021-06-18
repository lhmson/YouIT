import React, { createContext, useEffect, useState } from "react";
import { Layout, Row } from "antd";
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
import { useHistory } from "react-router";
import styles from "./styles.js";
import "./styles.css";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
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
  const history = useHistory();
  const [user, setUser] = useLocalStorage("user");

  const isOwner = (user) => {
    let isOwner = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?.result?._id) {
        if (member?.role === "Owner") isOwner = true;
      }
    });
    return isOwner;
  };

  const isAdmin = (user) => {
    let isAdmin = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?.result?._id) {
        if (member?.role === "Admin" || member?.role === "Owner")
          isAdmin = true;
      }
    });
    return isAdmin;
  };

  const isModerator = (user) => {
    let isModerator = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?.result?._id) {
        if (member?.role !== "Member") isModerator = true;
      }
    });
    return isModerator;
  };

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

  // check authorization for route
  useEffect(() => {
    if (
      (!isOwner(user) && menu === "setting") ||
      (!isAdmin(user) && menu === "member_requests") ||
      (!isModerator(user) && menu === "review_posts")
    ) {
      // history.push(`/group/${group?._id}/main`);
    }
  }, [menu]);

  return (
    <GroupContext.Provider value={valueContext}>
      <Layout>
        <Navbar selectedMenu="feed" />
        <Layout style={styles.mainArea}>
          <div className="feed-container">
            <AdminGroupSidebar
              className="sidebar"
              selectMenu={menu}
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
