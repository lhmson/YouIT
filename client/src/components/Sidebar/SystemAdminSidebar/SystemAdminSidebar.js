import React, { useEffect } from "react";
import { Layout } from "antd";
import styles from "./styles.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

import { fetchUserJoinedGroups } from "../../../redux/actions/group";
import { useSelector, useDispatch } from "react-redux";

import SystemAdminMenu from "./SystemAdminMenu/SystemAdminMenu.js";

const { Sider } = Layout;

function SystemAdminSidebar() {
  const [user] = useLocalStorage("user");
  // const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserJoinedGroups());
  }, []);

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
        <SystemAdminMenu user={user} groups={groups} />
      </Sider>
    </div>
  );
}

export default SystemAdminSidebar;
