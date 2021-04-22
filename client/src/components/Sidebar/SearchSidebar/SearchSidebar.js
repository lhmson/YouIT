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

function SearchSidebar() {
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
          key="username"
          style={{...styles.item,fontWeight:700, fontSize: 20}}
          disabled = {true}
          icon={
            <Avatar alt={user?.result?.name} src={"https://icons-for-free.com/iconfiles/png/512/look+magnifying+glass+search+icon-1320196720531471752.png"}>
              {user?.result?.name.charAt(0)}
            </Avatar>
          }
        >
          Lọc kết quả
        </Menu.Item>
        <Menu.Item
          key="post"
          style={styles.item}
          icon={<Avatar style={styles.transparent} />}
        >
          Bài viết
        </Menu.Item>
        <Menu.Item
          key="user"
          style={styles.item}
          icon={<Avatar style={styles.transparent} />}
        >
          Người dùng
        </Menu.Item>
        {/* </SubMenu> */}

        <Menu.Item
          key="group"
          style={styles.item}
          icon={<Avatar style={styles.transparent} />}
        >
          Nhóm
        </Menu.Item>
      </Menu>
      
    </Sider>
  );
}

export default SearchSidebar;
