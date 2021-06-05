import React, { useEffect, useState } from "react";
import { Button, Typography, Col, Image } from "antd";
import { Link } from "react-router-dom";
const { Title, Text, Paragraph } = Typography;

const buttonSize = 150;

function NoDataSearch() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "white", minHeight: 400 }}
    >
      <Col align="center" style={{ paddingBottom: 32 }}>
        <Image
          src="https://i.pinimg.com/564x/17/58/de/1758de784df9b2827b3431f0c6c4f162.jpg"
          width={300}
        />
        <Title level={3}>We didn't find any results</Title>
        <Text>
          Make sure everything is spelled correctly or try different keywords.
        </Text>
      </Col>
    </div>
  );
}

export default NoDataSearch;
