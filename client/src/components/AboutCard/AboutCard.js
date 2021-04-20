import React from "react";
import { Button, Row, Col, Divider, Form, Typography, Input, Card } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";

import styles from "./styles.js";

const { Title, Text } = Typography;

function AboutCard() {
  return (
    <>
      <div style={styles.whiteBackground}>
        <div className="row">
          <div
            className="col-2"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 36, fontWeight: 700 }}>About</Text>
          </div>
          <div
            className="col-2 offset-7"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              style={{ margin: 8, width: 128, borderRadius: 4 }}
            >
              Edit
            </Button>
          </div>
        </div>
        <Divider />
        <Card>
          <Title
            level={3}
            style={{
              color: "GrayText",
              display: "flex",
            }}
          >
            Section 1
          </Title>
          <Row
            style={{
              background: "pink",
              // flexGrow: 1,
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            className="text-center"
          >
            <Col
              span={2}
              style={{
                background: "yellow",
              }}
            >
              {/* <SmileOutlined />
              <Title level="3">Text</Title> */}
              <Button>Button</Button>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default AboutCard;
