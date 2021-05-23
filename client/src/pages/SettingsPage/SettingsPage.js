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
  Input,
  Select,
  Button,
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
import * as authAPI from "../../api/auth";

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
  const [form, setForm] = useState(null);
  const handleFinish = () => {
    // const data = {
    //   email: form.newEmail,
    //   password: form.newPassword,
    //   firstName: form.firstName,
    //   lastName: form.lastName,
    //   gender: form.gender,
    //   dob: form.dob,
    // };
    // dispatch(signup(data, history, setUser));
  };
  const handleFinishFailed = (errorInfo) => {
    errorInfo.errorFields.map((err) => {
      message.error(err.errors[0]);
    });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e?.target.name]: e?.target.value });
  };
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
      <h5>Change password</h5>
      <Form
        name="basic"
        size="large"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        className="mt-4"
      >
        <Form.Item name="currentPassword">
          <Input.Password
            name="currentPassword"
            autocomplete="newpassword"
            placeholder="Current password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Password is required.",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                // console.log("value", value.length);
                if (value.length >= 6) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Password must be at least 6 characters.")
                );
              },
            }),
          ]}
        >
          <Input.Password
            name="newPassword"
            autocomplete="newpassword"
            placeholder="New password"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Password confirm is required.",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Password does not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            autocomplete="newpassword"
            placeholder="Confirm password"
            suffix={null}
          />
        </Form.Item>

        <Form.Item style={{}}>
          <Button
            style={{ width: "100%" }}
            className="green-button"
            htmlType="submit"
          >
            Create account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const SettingsTabs = [
  {
    tab: <GeneralTab />,
  },
  {
    tab: <SecurityTab />,
  },
];

const SettingsPage = () => {
  const [currentTab, setCurrentTab] = useState("1");
  const handleSelectTab = (e) => {
    console.log("ekey", e.key);
    setCurrentTab(e.key);
  };
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
            onClick={handleSelectTab}
            selectedKeys={[currentTab]}
            mode="inline"
          >
            <h2 className="ml-3 mt-3">Settings</h2>
            <Menu.Item key="0">General</Menu.Item>
            <Menu.Item key="1">Security and Login</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ marginLeft: 350, marginTop: 32, marginRight: 100 }}>
          {SettingsTabs[currentTab].tab}
        </Content>
      </div>
    </Layout>
  );
};

export default SettingsPage;
