import React, { useState, useEffect } from "react";
import styles from "./styles.js";
import { Typography, Row, Col, Card, Tag, Space } from "antd";

import COLOR from "../../constants/colors.js";

const { Title, Text } = Typography;

function RelatedCard(props) {
  const { title, posts } = props;
  return (
    <>
      <Card
        title={<Title level={4}>{title}</Title>}
        bordered={false}
        className="mb-4"
      >
        {posts?.map((p) => (
          <Row className="mb-3" align="middle">
            <Col span={4} justify="center">
              <Tag color={COLOR.greenSmoke} style={styles.votesTag}>
                {p.upvoters?.length - p.downvoters?.length}
              </Tag>
            </Col>

            <Col span={20} align="start" justify="center">
              <a href={`/posts/${p._id}`} className="clickable dark-green">
                {p.title}
              </a>
            </Col>
          </Row>
        ))}
      </Card>
    </>
  );
}

export default RelatedCard;
