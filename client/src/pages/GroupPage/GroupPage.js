import { Button, Layout, Row, Col, message } from "antd";
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
  GroupMenu,
  ListButtons,
  Navbar,
} from "../../components/index.js";
import { Route, Switch, useHistory, useLocation } from "react-router";
import styles from "./styles.js";
import * as api from "../../api/group";
const { Content } = Layout;

export const GroupContext = createContext({
  group: {},
  setGroup: () => {},
});

function GroupPage(props) {
  const { id } = props.match.params;
  const history = useHistory();
  const location = useLocation();

  const [group, setGroup] = useState(null);
  const valueContext = { group, setGroup };

  useEffect(async () => {
    await fetchGroupInfo();
    //console.log(group);
  }, []);

  const fetchGroupInfo = async () => {
    const { data } = await api.fetchAGroup(id);
    setGroup(data);
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
  return (
    <GroupContext.Provider value={valueContext}>
      <Layout>
        <Navbar />
        <Sider>
          <AdminGroupSidebar />
        </Sider>
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
                <GroupBasicInfo />
                <Row
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  <Button type="primary" style={styles.button}>
                    Create Post
                  </Button>
                  <Button type="primary" style={styles.button}>
                    Invite
                  </Button>
                  <Button
                    type="primary"
                    style={styles.button}
                    onClick={() => {
                      handleDeleteGroup(id);
                    }}
                  >
                    Delete
                  </Button>
                </Row>
              </Row>
              <Row style={{ justifyContent: "space-between" }}>
                <GroupMenu />
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <GoSearch size={24} style={styles.icon} onClick={() => {}} />
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
                ) : (
                  <GroupAboutCard />
                )}
              </Layout>
            </Content>
          </Layout>
        </Col>
      </Layout>
    </GroupContext.Provider>
  );
}

export default GroupPage;
