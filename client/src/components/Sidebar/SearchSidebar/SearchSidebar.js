import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  TeamOutlined,
  LaptopOutlined,
  FileTextOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import styles from "./styles.js";

const { Sider } = Layout;

function SearchSidebar(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

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
        <Menu.Item
          key="username"
          style={{ ...styles.item, fontWeight: 700, fontSize: 20 }}
          disabled={true}
          icon={
            <Avatar
              alt={user?.result?.name}
              src={
                "https://icons-for-free.com/iconfiles/png/512/look+magnifying+glass+search+icon-1320196720531471752.png"
              }
            >
              {user?.result?.name.charAt(0)}
            </Avatar>
          }
        >
          Search Result
        </Menu.Item>
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
          Post
        </Menu.Item>
        <Menu.Item
          onClick={() => props.setModeSearch("User")}
          key="user"
          style={styles.item}
          icon={<TeamOutlined style={{ fontSize: "1.4rem" }} />}
        >
          User
        </Menu.Item>
        {/* </SubMenu> */}

        <Menu.Item
          onClick={() => props.setModeSearch("Group")}
          key="group"
          style={styles.item}
          icon={<LaptopOutlined style={{ fontSize: "1.4rem" }} />}
        >
          Group
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SearchSidebar;
