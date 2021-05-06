import React from "react";
import { Layout, Menu, Avatar, Row, Space, Typography } from "antd";

import styles from "./styles.js";
import { IoPersonAdd } from "react-icons/io5";
import { FiCheckSquare } from "react-icons/fi";
import { BiConversation } from "react-icons/bi";

const { Sider } = Layout;
const { Title, Text } = Typography;

function CreateAGroup() {
  return (
    <Sider
      width={400}
      style={{
        ...styles.paleBackground,
        ...styles.fixedSider,
      }}
    >
      <Text style={styles.header}>Create A Group</Text>
      <Row className="align-items-center" style={{ margin: 15 }}>
        <Avatar
          className="ml-1 clickable"
          size={80}
          style={{ marginLeft: 20 }}
          src="https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/179048033_1139396113169332_2102843025754757575_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=plNrtGcVUs8AX-qL0nd&_nc_ht=scontent-hkg4-2.xx&oh=9ec720ace0503fae288080f97a649df2&oe=60B9683D"
        />
        <div className="d-inline-flex flex-column ml-3">
          <Row style={{ alignItems: "center" }}>
            <Space size={4}>
              <Text className="clickable" strong style={{ fontSize: "1.5rem" }}>
                Thy cute
              </Text>
            </Space>
          </Row>
          <Text>Admin</Text>
        </div>
      </Row>
    </Sider>
  );
}

export default CreateAGroup;
