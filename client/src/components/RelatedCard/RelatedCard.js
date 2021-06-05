import React, { useState, useEffect } from "react";
import styles from "./styles.js";
import { Typography, Row, Col, Card, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";

import COLOR from "../../constants/colors.js";
import { limitNameLength } from "../../utils/limitNameLength.js";

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
        {posts?.map((p, i) => (
          <Row key={i} className="mb-3" align="middle">
            <Col span={4} justify="center">
              <Tag color={COLOR.greenSmoke} style={styles.votesTag}>
                {p.interactionInfo.listUpvotes.length -
                  p.interactionInfo.listDownvotes.length}
              </Tag>
            </Col>

            <Col span={20} align="start" justify="center">
              <Tooltip title={limitNameLength(p.title, 96)} placement="left">
                <Link to={`/post/${p._id}`} className="clickable dark-green">
                  {limitNameLength(p.title, 42)}
                </Link>
              </Tooltip>
            </Col>
          </Row>
        ))}
      </Card>
    </>
  );
}

export default RelatedCard;
