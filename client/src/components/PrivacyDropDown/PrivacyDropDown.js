import React from "react";
import { Dropdown, Button, Menu, message, Col, Row, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { MdPublic, RiGitRepositoryPrivateFill } from "react-icons/all";
import styles from "./styles.js";

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}
const { Text } = Typography;
function PrivacyDropDown() {
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key="1"
        icon={
          <MdPublic
            style={{
              fontSize: 24,
              marginRight: 10,
            }}
          />
        }
        style={{ fontSize: 18 }}
      >
        {" "}
        Public
      </Menu.Item>
      <Menu.Item
        key="1"
        icon={
          <RiGitRepositoryPrivateFill
            style={{
              fontSize: 24,
              marginRight: 10,
            }}
          />
        }
        style={{ fontSize: 18 }}
      >
        {" "}
        Private
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
            Vague
          </Col>
          <Col span={1}>
            <DownOutlined style={{ marginRight: 10 }} />
          </Col>
        </Row>
      </Button>
    </Dropdown>
  );
}

export default PrivacyDropDown;
