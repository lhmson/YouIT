import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import TextEditor from "../../components/TextEditor/TextEditor";
import styles from "./styles.js";

import Posts from "../../components/Posts/Posts";
import InputForm from "../../components/InputForm/InputForm";

import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function MainPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    return () => {};
  }, [currentId, dispatch]);

  return (
    <>
      <Layout>
        <Header className="header">
          <div style={styles.logo}>
            <Title type="success">YouIT</Title>
          </div>
          <Menu
            styles={styles.navItem}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={styles.paleBackground}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item> */}
            </Breadcrumb>
            <Posts setCurrentId={setCurrentId} />
            <InputForm currentId={currentId} setCurrentId={setCurrentId} />
            {/* <TextEditor /> */}
            <Content style={{ ...styles.paleBackground, ...styles.mainArea }}>
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default MainPage;
