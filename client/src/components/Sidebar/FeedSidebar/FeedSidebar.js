import React, { useEffect, useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import {
  RocketOutlined,
  LaptopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styles from "./styles.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import FeedMenu from "./FeedMenu/FeedMenu.js";

const { SubMenu } = Menu;
const { Sider } = Layout;

function FeedSidebar() {
  const [user] = useLocalStorage("user");
  const [visible, setVisible] = useState(false);

  useEffect(() => {}, []);

  const groups = useSelector((state) => state.groups);

  return (
    <div>
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
        <FeedMenu user={user} groups={groups} />
      </Sider>
      {/* <Drawer
        title="Topics"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
        style={{ zIndex: 100 }}
      >
        <FeedMenu user={user} groups={groups} />
      </Drawer> */}
    </div>
  );
}

export default FeedSidebar;
