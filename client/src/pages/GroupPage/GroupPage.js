import React, { createContext, useEffect, useState } from "react";
import { Layout, Row, Modal, message, Menu, Typography } from "antd";
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
import { ExclamationCircleOutlined } from "@ant-design/icons";

import SettingView from "../../components/GroupPage/SettingView/SettingView.js";
import Loading from "../../components/Loading/Loading";

const { Content } = Layout;
const { Text } = Typography;

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

  const { confirm } = Modal;

  const isJoinedGroup = () => {
    let isJoined = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?.result?._id) {
        isJoined = true;
      }
    });

    return isJoined;
  };

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

  const handleLeaveGroup = async (groupId, userId) => {
    api
      .leaveGroup(groupId, userId)
      .then((res) => {
        message.success("You have left the group.");
        history.push(`/feed`);
      })
      .catch((error) => message.success(error.message));
  };

  const handleDeleteGroup = (id) => {
    api
      .deleteGroup(id)
      .then((res) => {
        message.success(res.data.message);
        history.push(`/group/create`);
      })
      .catch((error) => message.success(error.message));
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure leave this group?",
      icon: <ExclamationCircleOutlined />,
      content: "If you leave this group, this group will be deleted ",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteGroup(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const menuMore = (
    <Menu>
      <Menu.Item
        key="leaveGroup"
        onClick={() => {
          // eslint-disable-next-line no-lone-blocks
          {
            isOwner(user)
              ? showDeleteConfirm(id)
              : handleLeaveGroup(id, user?.result?._id);
          }
        }}
      >
        <Row align="middle">
          <Text>Leave group</Text>
        </Row>
      </Menu.Item>
    </Menu>
  );

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
    isJoinedGroup();
    //console.log(group);
  }, []);

  // check authorization for route
  useEffect(() => {
    if (
      (!isOwner(user) && menu === "setting") ||
      (!isAdmin(user) && menu === "member_requests") ||
      (!isModerator(user) && menu === "review_posts")
    ) {
      history.push(`/group/${group?._id}/main`);
    }
  }, [menu]);

  // if (!group) return <Loading />;
  const SelectedGroupMenu = () => {
    switch (menu) {
      case "member_requests":
        return <MemberRequestsResult />;
      case "review_posts":
        return <PostRequestsResult />;
      case "setting":
        return <SettingView />;
      default:
        return (
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
                  ) : location.pathname === `/group/${group?._id}/about` ? (
                    <GroupAboutCard />
                  ) : (
                    <GroupMember />
                  )}
                </Layout>
              </Content>
            </Layout>
          </div>
        );
    }
  };

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
              {group ? <SelectedGroupMenu /> : <Loading />}
            </div>
          </div>
        </Layout>
      </Layout>
    </GroupContext.Provider>
  );
}

export default GroupPage;
