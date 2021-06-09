import React, { useContext } from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import styles from "./styles.js";
import { IoPersonAdd } from "react-icons/io5";
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

  const isAdmin = (user) => {
    let isAdmin = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId == user?.result?._id) {
        if (member?.role === "Admin" || member?.role === "Owner")
          isAdmin = true;
      }
    });
    return isAdmin;
  };

  const isModerator = (user) => {
    let isModerator = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId == user?.result?._id) {
        if (member?.role !== "Member") isModerator = true;
      }
    });
    return isModerator;
  };

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
        {isAdmin(user) ? (
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
        {isModerator(user) ? (
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
      </Menu>
    </Sider>
  );
}

export default AdminGroupSidebar;
