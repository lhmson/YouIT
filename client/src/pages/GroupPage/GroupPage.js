import { Button, Layout, Row, Col } from "antd";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import {
  AdminGroupSidebar,
  CoverPhoto,
  FeedPosts,
  GroupBasicInfo,
  ListButtons,
  Navbar,
} from "../../components/index.js";
import styles from "./styles.js";

const { Content } = Layout;

function GroupPage() {
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
