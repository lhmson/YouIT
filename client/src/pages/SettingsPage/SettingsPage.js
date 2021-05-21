import React, { useState, useEffect } from "react";
import styles from "./styles.js";
import {
  Layout,
  Typography,
  Menu,
  Card,
  Row,
  Dropdown,
  message,
  Tabs,
  Col,
  Form,
  Divider,
} from "antd";
import {
  DownOutlined,
  FieldTimeOutlined,
  MailOutlined,
} from "@ant-design/icons";

import Navbar from "../../components/Navbar/Navbar";
import FullPost from "../../components/Posts/FullPost/FullPost.js";
import RelatedCard from "../../components/RelatedCard/RelatedCard.js";
import FixedRightPanel from "../../components/FixedRightPanel/FixedRightPanel.js";
import * as postsApi from "../../api/post";
import * as commentsApi from "../../api/comment";
import CommentForm from "../../components/CommentForm/CommentForm.js";
import Comment from "../../components/Comment/Comment.js";
import COLOR from "../../constants/colors.js";
import { useHistory } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import EditableText from "../../components/UserInfo/AboutCard/OverviewPane/EditableText/EditableText.js";
const { TabPane } = Tabs;
const { Title, Text } = Typography;

const GeneralTab = () => {
  return (
    <div className="bg-white p-4">
      <h3>General</h3>
      <div
        style={{
          height: 1,
          backgroundColor: COLOR.gray,
          // marginTop: -20,
          marginBottom: 14,
        }}
      />
      <div>
        <div style={{ marginLeft: 12 }}>
          <EditableText
            firstIcon={
              <Text
                style={{ fontSize: 16, width: 150, color: COLOR.gray }}
                strong
              >
                Email
              </Text>
            }
            text="hau@gmail.com"
            placeholder="Email"
            // onChange={(value) => setAddress(value.target.value)}
            // onSave={saveAddress}
            setPreviousState={() => {
              // setAddress(user?.userInfo?.address ?? "VietNam");
            }}
            editable={true}
          />
        </div>
        <div
          style={{
            height: 1,
            backgroundColor: COLOR.whiteSmoke,
            marginTop: -20,
            marginBottom: 14,
          }}
        />
        <div style={{ marginLeft: 12 }}>
          <EditableText
            firstIcon={
              <Text
                style={{ fontSize: 16, width: 150, color: COLOR.gray }}
                strong
              >
                First name
              </Text>
            }
            text="Ngo"
            placeholder="First name"
            // onChange={(value) => setAddress(value.target.value)}
            // onSave={saveAddress}
            setPreviousState={() => {
              // setAddress(user?.userInfo?.address ?? "VietNam");
            }}
            editable={true}
          />
        </div>
        <div
          style={{
            height: 1,
            backgroundColor: COLOR.whiteSmoke,
            marginTop: -20,
            marginBottom: 14,
          }}
        />
        <div style={{ marginLeft: 12 }}>
          <EditableText
            firstIcon={
              <Text
                style={{ fontSize: 16, width: 150, color: COLOR.gray }}
                strong
              >
                Last name
              </Text>
            }
            text="Hau"
            placeholder="Last name"
            // onChange={(value) => setAddress(value.target.value)}
            // onSave={saveAddress}
            setPreviousState={() => {
              // setAddress(user?.userInfo?.address ?? "VietNam");
            }}
            editable={true}
          />
        </div>
      </div>
    </div>
  );
};

const SecurityTab = () => {
  return (
    <div className="bg-white p-4">
      <h3>Security</h3>
      <div
        style={{
          height: 1,
          backgroundColor: COLOR.gray,
          // marginTop: -20,
          marginBottom: 14,
        }}
      />
      <div>
        <div style={{ marginLeft: 12 }}>
          <EditableText
            firstIcon={
              <Text
                style={{ fontSize: 16, width: 150, color: COLOR.gray }}
                strong
              >
                Email
              </Text>
            }
            text="hau@gmail.com"
            placeholder="Email"
            // onChange={(value) => setAddress(value.target.value)}
            // onSave={saveAddress}
            setPreviousState={() => {
              // setAddress(user?.userInfo?.address ?? "VietNam");
            }}
            editable={true}
          />
        </div>
        <div
          style={{
            height: 1,
            backgroundColor: COLOR.whiteSmoke,
            marginTop: -20,
            marginBottom: 14,
          }}
        />
        <div style={{ marginLeft: 12 }}>
          <EditableText
            firstIcon={
              <Text
                style={{ fontSize: 16, width: 150, color: COLOR.gray }}
                strong
              >
                First name
              </Text>
            }
            text="Ngo"
            placeholder="First name"
            // onChange={(value) => setAddress(value.target.value)}
            // onSave={saveAddress}
            setPreviousState={() => {
              // setAddress(user?.userInfo?.address ?? "VietNam");
            }}
            editable={true}
          />
        </div>
        <div
          style={{
            height: 1,
            backgroundColor: COLOR.whiteSmoke,
            marginTop: -20,
            marginBottom: 14,
          }}
        />
        <div style={{ marginLeft: 12 }}>
          <EditableText
            firstIcon={
              <Text
                style={{ fontSize: 16, width: 150, color: COLOR.gray }}
                strong
              >
                Last name
              </Text>
            }
            text="Hau"
            placeholder="Last name"
            // onChange={(value) => setAddress(value.target.value)}
            // onSave={saveAddress}
            setPreviousState={() => {
              // setAddress(user?.userInfo?.address ?? "VietNam");
            }}
            editable={true}
          />
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <Layout>
      <Navbar />
      <div
        className="full"
        style={{
          ...styles.mainArea,
        }}
      >
        <Sider
          width="250"
          style={{
            // overflow: "auto",
            height: "100vh",
            position: "fixed",
            backgroundColor: "white",
          }}
        >
          <Menu
            style={{
              borderWidth: 0,
              backgroundColor: "white",
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            <h2 className="ml-3 mt-3">Settings</h2>
            <Menu.Item key="general">General</Menu.Item>
            <Menu.Item key="security">Security and Login</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ marginLeft: 350, marginTop: 32, marginRight: 100 }}>
          {SecurityTab()}
        </Content>
      </div>
    </Layout>
  );
};

export default SettingsPage;
