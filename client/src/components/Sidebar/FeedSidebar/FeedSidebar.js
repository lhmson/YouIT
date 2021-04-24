import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import styles from "./styles.js";

const { SubMenu } = Menu;
const { Sider } = Layout;
const { Title, Text } = Typography;

function FeedSidebar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {}, []);

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
        defaultSelectedKeys={["username"]}
        // defaultOpenKeys={["1"]}
        style={{
          height: "100%",
          borderRight: 0,
          fontWeight: 500,
          fontSize: "1rem",
        }}
      >
        {/* <SubMenu key="sub1" title="subnav 1"> */}
        <Menu.Item
          key="username"
          style={styles.item}
          icon={
            <Avatar alt={user?.result?.name} src={user?.result?.imageUrl}>
              {user?.result?.name.charAt(0)}
            </Avatar>
          }
        >
          {user?.result?.name}
        </Menu.Item>
        <Menu.Item
          key="friends"
          style={styles.item}
          icon={<Avatar style={styles.transparent} />}
        >
          Friends
        </Menu.Item>
        <Menu.Item
          key="group"
          style={styles.item}
          icon={<Avatar style={styles.transparent} />}
        >
          Groups
        </Menu.Item>
        {/* </SubMenu> */}
      </Menu>
    </Sider>
  );
}

export default FeedSidebar;