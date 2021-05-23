import React, { useEffect } from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  RocketOutlined,
  LaptopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styles from "./styles.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const { SubMenu } = Menu;
const { Sider } = Layout;

function FeedSidebar() {
  const [user] = useLocalStorage("user");

  useEffect(() => {}, []);

  const groups = useSelector((state) => state.groups);

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
        // defaultOpenKeys={["1"]}
        style={{
          height: "100%",
          borderRight: 0,
          fontWeight: 500,
          fontSize: "1rem",
        }}
      >
        <Menu.Item
          key="username"
          style={styles.item}
          icon={<RocketOutlined spin style={{ fontSize: "1.4rem" }} />}
        >
          My Profile
        </Menu.Item>

        <Menu.Item
          key="friends"
          style={styles.item}
          icon={<TeamOutlined style={{ fontSize: "1.4rem" }} />}
        >
          <Link to="/friends">Friends</Link>
        </Menu.Item>
        <SubMenu
          key="sub3"
          icon={<LaptopOutlined style={{ fontSize: "1.4rem" }} />}
          title="Groups"
        >
          {groups.map((group, i) => (
            <Menu.Item key={i} style={styles.item}>
              <Link to={`/group/${group?._id}`} target="_blank">
                {group?.name}
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default FeedSidebar;
