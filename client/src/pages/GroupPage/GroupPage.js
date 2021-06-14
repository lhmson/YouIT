import { Layout, Row, Dropdown, Menu, Typography, message, Modal } from "antd";
import Sider from "antd/lib/layout/Sider";
import React, { createContext, useEffect, useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
import { EllipsisOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
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
import * as api from "../../api/group";
import MemberRequestsResult from "../RequestsInGroupsPage/MemberRequestsResult/MemberRequestsResult.js";
import PostRequestsResult from "../RequestsInGroupsPage/PostRequestsResult/PostRequestsResult.js";
//import { leaveGroup } from "../../../../server/controllers/group.js";
import COLOR from "../../constants/colors.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { useHistory } from "react-router";
import styles from "./styles.js";
import "./styles.css";

const { Content } = Layout;
const { Text } = Typography;
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
  const [user, setUser] = useLocalStorage("user");
  const history = useHistory();

  const { confirm } = Modal;

  const handleLeaveGroup = async (groupId, userId) => {
    console.log("Thy");
    api
      .leaveGroup(groupId, userId)
      .then((res) => {
        message.success("You have left the group.");
        history.push(`/feed`);
      })
      .catch((error) => message.success(error.message));
  };

  const isOwner = (user) => {
    let isOwner = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?.result?._id) {
        if (member?.role === "Owner") isOwner = true;
      }
    });
    if (isOwner) console.log("la chu");
    else console.log("ko la chu");
    return isOwner;
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
      const { data } = await api.fetchAGroup(id);
      setGroup(data);
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
              setModeSearch={setModeSearch}
            />
            <div
              className="mainContent"
              id="scrollableDiv"
              style={{ minWidth: "87vw" }}
            >
              {modeSearch === "memberRequests" ? (
                <MemberRequestsResult />
              ) : modeSearch === "group" ? (
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
                        <Row
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Dropdown
                            overlay={menuMore}
                            trigger={["click"]}
                            placement="bottomCenter"
                          >
                            <EllipsisOutlined
                              style={{
                                fontSize: 20,
                                color: COLOR.black,
                                marginLeft: 20,
                              }}
                            />
                          </Dropdown>
                        </Row>
                      </Row>
                    </Content>
                  </Layout>
                  <Layout>
                    <Content>
                      <Layout className="container">
                        {location.pathname === `/group/${group?._id}` ? (
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
              ) : (
                <PostRequestsResult />
              )}
            </div>
          </div>
        </Layout>
      </Layout>
    </GroupContext.Provider>
  );
}

export default GroupPage;
