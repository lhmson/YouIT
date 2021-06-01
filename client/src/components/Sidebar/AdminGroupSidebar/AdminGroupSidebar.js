import React, { useContext } from "react";
import { Layout, Menu, Typography } from "antd";
import styles from "./styles.js";
import { IoHome, IoPersonAdd } from "react-icons/io5";
import { FiCheckSquare } from "react-icons/fi";
import { BiConversation } from "react-icons/bi";
import { Link } from "react-router-dom";
import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";

const { Sider } = Layout;
const { Text } = Typography;

function AdminGroupSidebar(props) {
  const { group } = useContext(GroupContext);
  const { setSelectedKey } = props;

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
        onSelect={(selectedItem) => {
          setSelectedKey(selectedItem.key);
        }}
      >
        <Menu.Item
          key="group"
          style={styles.item}
          icon={<IoHome style={styles.transparent} />}
          onClick={() => {}}
        >
          <Link to={`/group/${group?._id}`}>Group</Link>
        </Menu.Item>
        <Text className="container" style={styles.item}>
          Admin Tools
        </Text>
        <Menu.Item
          key="memberRequests"
          style={styles.item}
          icon={<IoPersonAdd style={styles.transparent} />}
          // onClick={() => {}}
        >
          <Link to={`/group/${group?._id}/requests`}>Member Requests</Link>
        </Menu.Item>
        <Menu.Item
          key="approvePosts"
          style={styles.item}
          icon={<FiCheckSquare style={styles.transparent} />}
          // onClick={() => props.setModeSearch("Post")}
        >
          <Link to={`/group/${group?._id}/requests`}>Approve Posts</Link>
        </Menu.Item>
        {/* <Menu.Item
          key="postTopics"
          style={styles.item}
          icon={<BiConversation style={styles.transparent} />}
        >
          Post Topics
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
}

export default AdminGroupSidebar;
