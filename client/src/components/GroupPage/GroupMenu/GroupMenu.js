import { Menu, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";
import styles from "./styles.js";

function GroupMenu() {
  const { group } = useContext(GroupContext);
  const location = useLocation();

  const getDefaultSelectedItem = () => {
    switch (location.pathname) {
      case `/group/${group?._id}/main`:
        return "groupPost";
      case `/group/${group?._id}/about`:
        return "about";
      case `/group/${group?._id}/members`:
        return "members";
      default:
        break;
    }
  };

  const defaultSelectedKey = getDefaultSelectedItem();

  const [selectedMenu, setSelectedMenu] = useState(defaultSelectedKey);

  useEffect(() => {
    setSelectedMenu(defaultSelectedKey);
  }, [defaultSelectedKey]);

  const handleClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <>
      <Row
        style={{
          marginLeft: 16,
          marginRight: 32,
          marginTop: 32,
          marginBottom: 24,
          justifyContent: "space-between",
        }}
      >
        <Menu
          onClick={handleClick}
          selectedKeys={[selectedMenu]}
          mode="horizontal"
        >
          <Menu.Item key="groupPost">
            <Link to={`/group/${group?._id}/main`} style={styles.linkView}>
              Group Post
            </Link>
          </Menu.Item>

          <Menu.Item key="about">
            <Link to={`/group/${group?._id}/about`} style={styles.linkView}>
              About
            </Link>
          </Menu.Item>
          <Menu.Item key="members">
            <Link to={`/group/${group?._id}/members`} style={styles.linkView}>
              Members
            </Link>
          </Menu.Item>
        </Menu>
      </Row>
    </>
  );
}

export default GroupMenu;
