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

function GroupSidebar(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {}, []);

  return (
    <Sider
      width={300}
      style={{
        ...styles.paleBackground,
        ...styles.fixedSider,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["post"]}
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
          key="post"
          onClick={() => props.setModeSearch("Post")}
          style={styles.item}
          icon={<Avatar style={styles.transparent} />}
        >
          Member Requests
        </Menu.Item>
        <Menu.Item
          onClick={() => props.setModeSearch("User")}
          key="user"
          style={styles.item}
          icon={<Avatar style={styles.transparent} />}
        >
          Approve Posts
        </Menu.Item>
        {/* </SubMenu> */}

        <Menu.Item
          onClick={() => props.setModeSearch("Group")}
          key="group"
          style={styles.item}
          icon={<Avatar style={styles.transparent} />}
        >
          Post Topic
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default GroupSidebar;
