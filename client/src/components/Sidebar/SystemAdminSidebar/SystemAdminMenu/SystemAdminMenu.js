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
import { Link, useHistory } from "react-router-dom";

const { SubMenu } = Menu;

function SystemAdminMenu({ selectedMenu }) {
  const history = useHistory();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[selectedMenu]}
      style={{
        height: "100%",
        borderRight: 0,
        fontWeight: 500,
        fontSize: "1rem",
      }}
    >
      <Menu.Item
        key="dashboard"
        onClick={() => history.push("/admin/dashboard")}
        style={styles.item}
        icon={<KeyOutlined style={{ fontSize: "1.4rem" }} />}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        onClick={() => history.push("/admin/user")}
        key="user"
        style={styles.item}
        icon={<TeamOutlined style={{ fontSize: "1.4rem" }} />}
      >
        User
      </Menu.Item>
      {/* <Menu.Item
        key="post"
        onClick={() => history.push("/admin/post")}
        style={styles.item}
        icon={<FileTextOutlined style={{ fontSize: "1.4rem" }} />}
      >
        Post
      </Menu.Item> */}
      <Menu.Item
        key="group"
        onClick={() => history.push("/admin/group")}
        style={styles.item}
        icon={<LaptopOutlined style={{ fontSize: "1.4rem" }} />}
      >
        Group
      </Menu.Item>
      {/* <SubMenu
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
      </SubMenu> */}
    </Menu>
  );
}

export default SystemAdminMenu;
