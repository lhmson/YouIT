import React from "react";
import { Menu, Tooltip } from "antd";
import {
  UserOutlined,
  CoffeeOutlined,
  TeamOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import styles from "../styles.js";
import { Link } from "react-router-dom";
import { limitNameLength } from "../../../../utils/limitNameLength";

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
        icon={<UserOutlined style={{ fontSize: "1.4rem" }} />}
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
        key="groups"
        icon={<LaptopOutlined style={{ fontSize: "1.4rem" }} />}
        title="Groups"
      >
        <Menu.Item key="groups-all" style={styles.item}>
          <Link to="/groups">All</Link>
        </Menu.Item>
        {groups?.map((group, i) => (
          <Menu.Item key={group._id} style={styles.item}>
            <Tooltip title={group?.name} placement="right">
              <Link to={`/group/${group?._id}/main`} target="_blank">
                {limitNameLength(group?.name, 18)}
              </Link>
            </Tooltip>
          </Menu.Item>
        ))}
      </SubMenu>
      <Menu.Item
        key="hack"
        style={styles.item}
        icon={<CoffeeOutlined style={{ fontSize: "1.4rem" }} />}
      >
        <Link to="/group/60e51aa16054b10818319aed/main">Code contests</Link>
      </Menu.Item>
    </Menu>
  );
}

export default FeedMenu;
