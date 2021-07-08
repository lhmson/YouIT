import React from "react";
import { Typography, Col, Image } from "antd";

const { Title, Text } = Typography;

function LoadingSearch() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "white", minHeight: 400 }}
    >
      <Col align="center" style={{ paddingBottom: 32 }}>
        <img
          src={
            "https://i.pinimg.com/originals/e6/14/50/e6145004c6448bbc9c4601a6413d3c45.gif"
          }
          width={300}
          alt={"loading"}
        />
        <Title level={3}>Loading</Title>
        <Text>Wait a minute, we'll find you what you're looking for!</Text>
      </Col>
    </div>
  );
}

export default LoadingSearch;
