import React from "react";
import { Dropdown, Button, Menu, message, Col, Row, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./styles.js";

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}
const { Text } = Typography;
function TopicDropDown() {
  const menu = (
    <Menu onClick={handleMenuClick} style={{ height: 300 }}>
      <Menu.Item key="1" style={{ fontSize: 18 }}>
        General
      </Menu.Item>
      <Menu.Item key="1" style={{ fontSize: 18 }}>
        {" "}
        Game
      </Menu.Item>
      <Menu.Item key="1" style={{ fontSize: 18 }}>
        {" "}
        Language
      </Menu.Item>
      <Menu.Item key="1" style={{ fontSize: 18 }}>
        {" "}
        Mobile
      </Menu.Item>{" "}
      <Menu.Item key="1" style={{ fontSize: 18 }}>
        {" "}
        Web Dev
      </Menu.Item>{" "}
      <Menu.Item key="1" style={{ fontSize: 18 }}>
        {" "}
        System
      </Menu.Item>
      <Menu.Item key="1" style={{ fontSize: 18 }}>
        {" "}
        Jobs
      </Menu.Item>{" "}
      <Menu.Item key="1" style={{ fontSize: 18 }}>
        {" "}
        Data
      </Menu.Item>{" "}
      <Menu.Item key="1" style={{ fontSize: 18 }}>
        {" "}
        School
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button style={{ margin: 30, width: 300, height: 50 }}>
        <Row wrap={false}>
          <Col
            span={23}
            class="text-muted"
            style={{ fontSize: 20, textAlign: "left" }}
          >
            Topic
          </Col>
          <Col span={1}>
            <DownOutlined style={{ marginRight: 10 }} />
          </Col>
        </Row>
      </Button>
    </Dropdown>
  );
}

export default TopicDropDown;
