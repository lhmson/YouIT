import React, { useEffect, useState } from "react";
import { Button, Typography, Col, Image } from "antd";
import { Link } from "react-router-dom";
const { Title, Text, Paragraph } = Typography;

const buttonSize = 150;

function LoadingSearch() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "white", minHeight: 400 }}
    >
      <Col align="center" style={{ paddingBottom: 32 }}>
        <Image
          src="https://i.pinimg.com/originals/fa/87/77/fa87774590186b287a5338d7c87afc0c.gif"
          width={300}
        />
        <Title level={3}>Loading</Title>
        <Text>Wait a minute, we'll find you what you're looking for!</Text>
      </Col>
    </div>
  );
}

export default LoadingSearch;
