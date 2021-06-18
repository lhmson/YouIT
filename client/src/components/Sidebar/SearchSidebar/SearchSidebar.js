import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  TeamOutlined,
  LaptopOutlined,
  FileTextOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import styles from "./styles.js";

const { Text } = Typography;
const { Sider } = Layout;

function SearchSidebar(props) {
  useEffect(() => {}, []);

  return (
    <Sider
      breakpoint="lg"
      // width={200}
      collapsedWidth="0"
      // trigger={null}
      style={{
        ...styles.paleBackground,
        ...styles.fixedSider,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["all"]}
        style={{
          height: "100%",
          borderRight: 0,
          fontWeight: 500,
          fontSize: "1rem",
        }}
      >
        {/* <SubMenu key="sub1" title="subnav 1"> */}
        <Text className="container" style={styles.item}>
          Search Result
        </Text>
        <Menu.Item
          key="all"
          onClick={() => props.setModeSearch("All")}
          style={styles.item}
          icon={<KeyOutlined style={{ fontSize: "1.4rem" }} />}
        >
          All
        </Menu.Item>
        <Menu.Item
          key="post"
          onClick={() => props.setModeSearch("Post")}
          style={styles.item}
          icon={<FileTextOutlined style={{ fontSize: "1.4rem" }} />}
        >
          Posts
        </Menu.Item>
        <Menu.Item
          onClick={() => props.setModeSearch("User")}
          key="user"
          style={styles.item}
          icon={<TeamOutlined style={{ fontSize: "1.4rem" }} />}
        >
          Users
        </Menu.Item>
        {/* </SubMenu> */}

        <Menu.Item
          onClick={() => props.setModeSearch("Group")}
          key="group"
          style={styles.item}
          icon={<LaptopOutlined style={{ fontSize: "1.4rem" }} />}
        >
          Groups
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SearchSidebar;
