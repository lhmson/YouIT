import React, { useState } from "react";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { Link, useLocation } from "react-router-dom";

import styles from "./styles.js";
import { useSelector } from "react-redux";

const ListButtons = () => {
  const user = useSelector((state) => state.user);

  const location = useLocation();

  const getDefaultSelectedItem = () => {
    switch (location.pathname) {
      case `/userinfo/${user?._id}`:
        return "post";
      case `/userinfo/${user?._id}/about`:
        return "about";
      default:
        break;
    }
  };

  const defaultSelectedKey = getDefaultSelectedItem();

  const [selectedMenu, setSelectedMenu] = useState(defaultSelectedKey);

  const handleClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <div className="container" style={{ marginBottom: 32 }}>
      <Menu
        onClick={handleClick}
        selectedKeys={[selectedMenu]}
        mode="horizontal"
      >
        <Menu.Item key="post" icon={<MailOutlined />}>
          <Link to={`/userinfo/${user?._id}`} style={styles.linkView}>
            Post
          </Link>
        </Menu.Item>

        <Menu.Item key="about" icon={<MailOutlined />}>
          <Link to={`/userinfo/${user?._id}/about`} style={styles.linkView}>
            About
          </Link>
        </Menu.Item>
        <Menu.Item key="more" icon={<MailOutlined />}>
          <Link to="/wall" style={styles.linkView}>
            More
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default ListButtons;
