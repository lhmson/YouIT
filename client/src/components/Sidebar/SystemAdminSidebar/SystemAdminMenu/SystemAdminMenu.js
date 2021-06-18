import React from "react";
import { Menu } from "antd";
import {
  FileTextOutlined,
  KeyOutlined,
  LaptopOutlined,
  TeamOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import styles from "../styles.js";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

function SystemAdminMenu({ user, groups }) {
  return (
    <Menu
      mode="inline"
      style={{
        height: "100%",
        borderRight: 0,
        fontWeight: 500,
        fontSize: "1rem",
      }}
    >
      <Menu.Item
        key="all"
        // onClick={() => setModeManage("All")}
        style={styles.item}
        icon={<KeyOutlined style={{ fontSize: "1.4rem" }} />}
      >
        All
      </Menu.Item>
      <Menu.Item
        key="post"
        // onClick={() => setModeManage("Post")}
        style={styles.item}
        icon={<FileTextOutlined style={{ fontSize: "1.4rem" }} />}
      >
        Post
      </Menu.Item>
      <Menu.Item
        // onClick={() => setModeManage("User")}
        key="user"
        style={styles.item}
        icon={<TeamOutlined style={{ fontSize: "1.4rem" }} />}
      >
        User
      </Menu.Item>

      <Menu.Item
        // onClick={() => setModeManage("Group")}
        key="group"
        style={styles.item}
        icon={<LaptopOutlined style={{ fontSize: "1.4rem" }} />}
      >
        Group
      </Menu.Item>
      <SubMenu
        key="stats"
        icon={<LineChartOutlined style={{ fontSize: "1.4rem" }} />}
        title="Statistics"
      >
        <Menu.Item key="stat_post" style={styles.item}>
          Post
        </Menu.Item>
        <Menu.Item key="stat_user" style={styles.item}>
          User
        </Menu.Item>
        <Menu.Item key="stat_group" style={styles.item}>
          Group
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default SystemAdminMenu;
