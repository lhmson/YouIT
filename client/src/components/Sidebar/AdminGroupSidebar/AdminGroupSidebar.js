import React, { useContext } from "react";
import { Layout, Menu, Typography } from "antd";
import styles from "./styles.js";
import { IoPersonAdd, IoSettingsSharp } from "react-icons/io5";
import { FiCheckSquare } from "react-icons/fi";
import { BiConversation } from "react-icons/bi";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { GroupContext } from "../../../pages/GroupPage/GroupPage";
import { useHistory } from "react-router-dom";

const { Sider } = Layout;
const { Text } = Typography;

function AdminGroupSidebar(props) {
  const [user, setUser] = useLocalStorage("user");
  const { group } = useContext(GroupContext);

  const history = useHistory();

  // const [selectMenu, setSelectMenu] = useState("group");

  const isAdmin = (user) => {
    let isAdmin = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?.result?._id) {
        if (member?.role === "Admin" || member?.role === "Owner")
          isAdmin = true;
      }
    });
    return isAdmin;
  };

  const isOwner = (user) => {
    let isOwner = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?.result?._id) {
        if (member?.role === "Owner") isOwner = true;
      }
    });
    return isOwner;
  };

  const isModerator = (user) => {
    let isModerator = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?.result?._id) {
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
        defaultSelectedKeys={[props.selectMenu]}
        //defaultOpenKeys={["1"]}
        style={{
          height: "100%",
          borderRight: 0,
          fontWeight: 500,
          fontSize: "1rem",
        }}
      >
        {isModerator() && (
          <Text className="container" style={styles.item}>
            Admin Tools
          </Text>
        )}
        <Menu.Item
          key="main"
          style={styles.item}
          icon={<BiConversation style={styles.transparent} />}
          // onClick={() => props.setModeSearch("group")}
          onClick={() => {
            // setSelectMenu("group");
            history.push(`/group/${group?._id}/main`);
          }}
        >
          Main
        </Menu.Item>
        {isAdmin(user) ? (
          <Menu.Item
            key="member_requests"
            style={styles.item}
            icon={<IoPersonAdd style={styles.transparent} />}
            // onClick={() => props.setModeSearch("memberRequests")}
            onClick={() => {
              // setSelectMenu("memberRequests");
              history.push(`/group/${group?._id}/member_requests`);
            }}
          >
            Member Requests
          </Menu.Item>
        ) : (
          ""
        )}
        {isModerator(user) ? (
          <Menu.Item
            key="review_posts"
            style={styles.item}
            icon={<FiCheckSquare style={styles.transparent} />}
            // onClick={() => props.setModeSearch("approvePosts")}
            onClick={() => {
              // setSelectMenu("approvePosts");
              history.push(`/group/${group?._id}/review_posts`);
            }}
          >
            Review Posts
          </Menu.Item>
        ) : (
          ""
        )}
        {isOwner(user) ? (
          <Menu.Item
            key="setting"
            style={styles.item}
            icon={<IoSettingsSharp style={styles.transparent} />}
            // onClick={() => props.setModeSearch("setting")}
            onClick={() => {
              // setSelectMenu("setting");
              history.push(`/group/${group?._id}/setting`);
            }}
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
