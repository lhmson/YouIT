import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.js";
import {
  Layout,
  Typography,
  Breadcrumb,
  Menu,
  Affix,
  Button,
  Row,
  Col,
  Card,
  Tag,
} from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import Navbar from "../../components/Navbar/Navbar";
import { getPosts } from "../../redux/actions/posts.js";
import FullPost from "../../components/Posts/FullPost/FullPost.js";
import FeedSidebar from "../../components/Sidebar/FeedSidebar/FeedSidebar.js";
import Loading from "../../components/Loading/Loading.js";
import COLOR from "../../constants/colors.js";
import { PresetColorTypes } from "antd/lib/_util/colors";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

function SpecificPost(props) {
  const { match, history } = props;
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
      <Layout>
        <Navbar selectedMenu="test" />

        <Layout style={styles.mainArea}>
          {!posts.length ? (
            <Loading />
          ) : (
            <Content>
              <div className="mr-4  ">
                <FullPost />
              </div>
            </Content>
          )}
          <Sider
            className="col-{breakpoint}-auto"
            width={350}
            style={{
              backgroundColor: "transparent",
            }}
          >
            <div className="mr-4" style={{ position: "fixed" }}>
              <div className="site-card-border-less-wrapper mb-4">
                <Card
                  title={<Title level={4}>Related posts</Title>}
                  bordered={false}
                >
                  <Row
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <Col span={5}>
                      <Tag
                        color={COLOR.greenSmoke}
                        style={{
                          color: COLOR.darkGreen,
                          width: 40,
                          textAlign: "center",
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        420
                      </Tag>
                    </Col>

                    <Col span={19}>
                      <Text className="link">
                        Học Redux trong 15 phút cho người mới bắt đầu
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </div>
              <div className="site-card-border-less-wrapper">
                <Card
                  title={<Title level={4}>From this creator</Title>}
                  bordered={false}
                >
                  <Row
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <Col span={5}>
                      <Tag
                        color={COLOR.greenSmoke}
                        style={{
                          color: COLOR.darkGreen,
                          width: 40,
                          textAlign: "center",
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        420
                      </Tag>
                    </Col>

                    <Col span={19}>
                      <Text className="link">
                        Học Redux trong 15 phút cho người mới bắt đầu
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </div>
            </div>
          </Sider>
        </Layout>
      </Layout>
    </>
  );
}

export default SpecificPost;
