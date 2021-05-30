import { Button, Layout, Row, Col, message } from "antd";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import {
  AdminGroupSidebar,
  CoverPhoto,
  FeedPosts,
  GroupBasicInfo,
  Navbar,
} from "../../components/index.js";
import { useHistory } from "react-router";
import styles from "./styles.js";
import * as api from "../../api/group";
import ListButtons from "../../components/GroupPage/ListButtons/ListButtons.js";
const { Content } = Layout;

function GroupPage(props) {
  const { id } = props.match.params;
  console.log(id);

  const history = useHistory();

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
    <Layout>
      <Navbar />
      <Sider>
        <AdminGroupSidebar />
      </Sider>
      <Layout style={styles.mainArea}>
        <Content>
          <Layout className="container">
            <CoverPhoto />
            <Row style={{ display: "flex", flexDirection: "row" }}>
              <Col span={12}>
                <GroupBasicInfo />
              </Col>
              <Col
                span={6}
                offset={6}
                style={{
                  display: "flex",
                  alignItems: "center",
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
                    // handleDeleteGroup(id);
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <ListButtons />
              </Col>
              <Col
                span={3}
                offset={9}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <GoSearch size={24} style={styles.icon} onClick={() => {}} />
                <BsThreeDots size={24} style={styles.icon} />
              </Col>
            </Row>
            <FeedPosts />
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}

export default GroupPage;
