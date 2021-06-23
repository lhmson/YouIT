import React, { useEffect } from "react";
import { Layout } from "antd";
import styles from "./styles.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

import { useDispatch } from "react-redux";

import SystemAdminMenu from "./SystemAdminMenu/SystemAdminMenu.js";

const { Sider } = Layout;

function SystemAdminSidebar({ selectedMenu }) {
  const [user] = useLocalStorage("user");
  // const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

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
        <SystemAdminMenu user={user} selectedMenu={selectedMenu} />
      </Sider>
    </div>
  );
}

export default SystemAdminSidebar;
