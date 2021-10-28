import React from "react";
import { Typography, Col } from "antd";

const { Title } = Typography;

function NoMutualFriends() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "white", minHeight: 400 }}
    >
      <Col align="center" style={{ paddingBottom: 32 }}>
        <img
          src="https://i.pinimg.com/originals/1d/2b/9c/1d2b9c185fde0e60a2bb2318113ab355.gif"
          width={400}
          alt={"mutual friend loading"}
        />
        <Title level={3}>No mutual friends</Title>
      </Col>
    </div>
  );
}

export default NoMutualFriends;
