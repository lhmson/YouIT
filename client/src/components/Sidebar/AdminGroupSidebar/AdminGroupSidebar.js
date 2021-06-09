import React, { useContext } from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import styles from "./styles.js";
import { IoPersonAdd, IoSettingsSharp } from "react-icons/io5";
import { FiCheckSquare } from "react-icons/fi";
import { BiConversation } from "react-icons/bi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { GroupContext } from "../../../pages/GroupPage/GroupPage";

const { Sider } = Layout;
const { Text } = Typography;

function AdminGroupSidebar(props) {
  const [user, setUser] = useLocalStorage("user");
  const { group } = useContext(GroupContext);

  const isOwner = (user) => {
    let isOwner = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId == user?.result?._id) {
        if (member?.role !== "Member") isOwner = true;
      }
    });
    return isOwner;
  };

  return (
    <Sider
      width={200}
      style={{
        ...styles.paleBackground,
        ...styles.fixedSider,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["group"]}
        //defaultOpenKeys={["1"]}
        style={{
          height: "100%",
          borderRight: 0,
          fontWeight: 500,
          fontSize: "1rem",
        }}
      >
        <Text className="container" style={styles.item}>
          Admin Tools
        </Text>
        <Menu.Item
          key="group"
          style={styles.item}
          icon={<BiConversation style={styles.transparent} />}
          onClick={() => props.setModeSearch("group")}
        >
          Your Group
        </Menu.Item>
        {isOwner(user) ? (
          <Menu.Item
            key="memberRequests"
            style={styles.item}
            icon={<IoPersonAdd style={styles.transparent} />}
            onClick={() => props.setModeSearch("memberRequests")}
          >
            Member Requests
          </Menu.Item>
        ) : (
          ""
        )}
        {isOwner(user) ? (
          <Menu.Item
            key="approvePosts"
            style={styles.item}
            icon={<FiCheckSquare style={styles.transparent} />}
            onClick={() => props.setModeSearch("approvePosts")}
          >
            Approve Posts
          </Menu.Item>
        ) : (
          ""
        )}
        {isOwner(user) ? (
          <Menu.Item
            key="setting"
            style={styles.item}
            icon={<IoSettingsSharp style={styles.transparent} />}
            onClick={() => props.setModeSearch("setting")}
          >
            Setting
          </Menu.Item>
        ) : (
          ""
        )}
      </Menu>
    </Sider>
  );
}

export default AdminGroupSidebar;
