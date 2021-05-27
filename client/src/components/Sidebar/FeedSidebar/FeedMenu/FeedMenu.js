import React from "react";
import { Menu } from "antd";
import {
  RocketOutlined,
  LaptopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styles from "../styles.js";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

function FeedMenu({ user, groups }) {
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
        key="username"
        style={styles.item}
        icon={<RocketOutlined spin style={{ fontSize: "1.4rem" }} />}
      >
        <Link to={`/userinfo/${user?.result._id}`}>My Profile</Link>
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
  );
}

export default FeedMenu;
