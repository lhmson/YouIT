import React, { useEffect } from "react";
import { Layout } from "antd";
import styles from "./styles.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

import { fetchUserJoinedGroups } from "../../../redux/actions/group";
import { useSelector, useDispatch } from "react-redux";
import FeedMenu from "./FeedMenu/FeedMenu.js";

const { Sider } = Layout;

function FeedSidebar() {
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
        <FeedMenu user={user} groups={groups} />
      </Sider>
      {/* <Drawer
        title="Topics"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
        style={{ zIndex: 100 }}
      >
        <FeedMenu user={user} groups={groups} />
      </Drawer> */}
    </div>
  );
}

export default FeedSidebar;
