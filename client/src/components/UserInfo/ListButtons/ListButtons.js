import React, { useEffect, useState } from "react";
import { Button, Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

import styles from "./styles.js";
import { useSelector } from "react-redux";

const ListButtons = () => {
  const user = useSelector((state) => state.user);
  const [selectedMenu, setSelectedMenu] = useState("post");

  const handleClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <div className="container" style={{ marginBottom: 32 }}>
      {/* <div className="row"> */}
      <Menu
        onClick={handleClick}
        selectedKeys={[selectedMenu]}
        mode="horizontal"
      >
        {/* <Link to={`/userinfo/${user?._id}`} style={styles.linkView}> */}
        <Menu.Item key="post" icon={<MailOutlined />}>
          <Link to={`/userinfo/${user?._id}`} style={styles.linkView}>
            Post
          </Link>
        </Menu.Item>
        {/* </Link> */}

        {/* <Link to={`/userinfo/${user?._id}/about`} style={styles.linkView}> */}
        <Menu.Item key="about" icon={<MailOutlined />}>
          <Link to={`/userinfo/${user?._id}/about`} style={styles.linkView}>
            About
          </Link>
        </Menu.Item>
        {/* </Link> */}
        {/* <Link to="/wall" style={styles.linkView}> */}
        <Menu.Item key="more" icon={<MailOutlined />}>
          <Link to="/wall" style={styles.linkView}>
            More
          </Link>
        </Menu.Item>
        {/* </Link> */}
      </Menu>
      {/* </div> */}

      {/* <Button className="white-button" style={styles.button}>
          Posts
        </Button>

        
          <Button className="white-button" style={styles.button}>
            About
          </Button>
        
        
          <Button className="white-button" style={styles.button}>
            More
          </Button> */}
    </div>
  );
};

export default ListButtons;
