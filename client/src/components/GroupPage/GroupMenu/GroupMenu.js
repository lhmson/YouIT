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
      case `/group/${group?._id}`:
        return "groupPost";
      case `/group/${group?._id}/about`:
        return "about";
      case `/group/${group?._id}/member`:
        return "member";
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
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginBottom: 32, maxWidth: "50vw" }}>
          <Menu
            onClick={handleClick}
            selectedKeys={[selectedMenu]}
            mode="horizontal"
          >
            <Menu.Item key="groupPost">
              <Link to={`/group/${group?._id}`} style={styles.linkView}>
                Group Post
              </Link>
            </Menu.Item>

            <Menu.Item key="about">
              <Link to={`/group/${group?._id}/about`} style={styles.linkView}>
                About
              </Link>
            </Menu.Item>
            <Menu.Item key="member">
              <Link to={`/group/${group?._id}/member`} style={styles.linkView}>
                Group Member
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Row>
    </>
  );
}

export default GroupMenu;
