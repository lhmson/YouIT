import { Layout, Row, Dropdown, Menu, Typography, message } from "antd";
import Sider from "antd/lib/layout/Sider";
import React, { createContext, useEffect, useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
import { EllipsisOutlined } from "@ant-design/icons";
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
import MemberRequestsResult from "../RequestsInGroupsPage/MemberRequestsResult/MemberRequestsResult.js";
import PostRequestsResult from "../RequestsInGroupsPage/PostRequestsResult/PostRequestsResult.js";
//import { leaveGroup } from "../../../../server/controllers/group.js";
import COLOR from "../../constants/colors.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { useHistory } from "react-router";
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
  const handleRemoveMember = async (groupId, userId) => {
    // apiGroup
    //   .deleteMember(groupId, userId)
    //   .then((res) => {
    //     message.success(res.data.message);
    //     // history.push(`/group/${groupId}/members`);
    //     window.location.reload();
    //   })
    //   .catch((error) => message.success(error.message));
  };

  const handleLeaveGroup = async (id, userId) => {
    console.log("groupid", id);
    console.log("userid", userId);
    api
      .leaveGroup(id, userId)
      .then((res) => {
        message.success(res.data.message);
        history.push(`/feed`);
      })
      .catch((error) => message.success(error.message));
  };

  const menuMore = (
    <Menu>
      <Menu.Item
        key="logout"
        onClick={() => {
          handleLeaveGroup(id, user?.result?._id);
        }}
      >
        <Row align="middle">
          <Text>Leave group</Text>
        </Row>
      </Menu.Item>
    </Menu>
  );

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
        {/* <Layout style={styles.mainArea}> */}
        <Layout style={{ marginTop: 60 }}>
          <Content>
            {modeSearch === "memberRequests" ? (
              <MemberRequestsResult />
            ) : modeSearch === "group" ? (
              <Layout>
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
                        {/* <BsThreeDots size={24} style={styles.icon} /> */}
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
                      ) : location.pathname === `/group/${group?._id}/about` ? (
                        <GroupAboutCard />
                      ) : (
                        <GroupMember />
                      )}
                    </Layout>
                  </Content>
                </Layout>
              </Layout>
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
