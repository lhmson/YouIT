import React, { useState, useEffect } from "react";
import styles from "./styles.js";
import { Typography, Row, Col, Card, Tag } from "antd";

import COLOR from "../../constants/colors.js";

const { Title, Text } = Typography;

function RelatedCard(props) {
  const { title } = props;
  return (
    <>
      <div className="site-card-border-less-wrapper mb-4">
        <Card title={<Title level={4}>{title}</Title>} bordered={false}>
          <Row
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Col span={5}>
              <Tag color={COLOR.greenSmoke} style={styles.votesTag}>
                420
              </Tag>
            </Col>

            <Col span={19}>
              <a className="clickable" style={{ color: COLOR.darkGreen }}>
                Học Redux trong 15 phút cho người mới bắt đầu
              </a>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default RelatedCard;
