import React from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import styles from "./styles.js";
import { IoPersonAdd } from "react-icons/io5";
import { FiCheckSquare } from "react-icons/fi";
import { BiConversation } from "react-icons/bi";

const { Sider } = Layout;
const { Title, Text } = Typography;

function AdminGroupSidebar(props) {
  return (
    <Sider
      width={200}
      style={{
        ...styles.paleBackground,
        ...styles.fixedSider,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["memberRequests"]}
        //defaultOpenKeys={["1"]}
        style={{
          height: "100%",
          borderRight: 0,
          fontWeight: 500,
          fontSize: "1rem",
        }}
      >
        <Text className="container" style={styles.item}>
          Admin Tools
        </Text>
        <Menu.Item
          key="memberRequests"
          style={styles.item}
          icon={<IoPersonAdd style={styles.transparent} />}
          onClick={() => props.setModeSearch("User")}
        >
          Member Requests
        </Menu.Item>
        <Menu.Item
          key="approvePosts"
          style={styles.item}
          icon={<FiCheckSquare style={styles.transparent} />}
          onClick={() => props.setModeSearch("Post")}
        >
          Approve Posts
        </Menu.Item>
        <Menu.Item
          key="postTopics"
          style={styles.item}
          icon={<BiConversation style={styles.transparent} />}
        >
          Post Topics
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default AdminGroupSidebar;
