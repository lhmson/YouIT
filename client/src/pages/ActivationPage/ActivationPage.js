import React, { useEffect, useState } from "react";
import { Button, Typography, Col } from "antd";
import styles from "./styles";
import { Link } from "react-router-dom";
const { Title } = Typography;

const buttonSize = 150;

function ActivationPage(props) {
  const { token } = props.match.params;

  return (
    <div
      className="full d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "white" }}
    >
      <Col align="center" style={{ paddingBottom: 32 }}>
        <img
          src={require(`../../assets/mail/sent.png`).default}
          alt="error"
          style={{ width: 400, marginBottom: 24 }}
        />
        <Title style={{ fontWeight: "lighter" }}>
          Please verify your email
        </Title>
        <Title className="mb-4" level={5}>
          A verification mail has been sent to your email. If you cannot find
          <br />
          the verification mail, please check the junk/spam folder.
        </Title>
        <Link to="/login">
          <Button
            className="white-button mr-3"
            size="large"
            style={{ width: buttonSize }}
          >
            Back
          </Button>
        </Link>
        <Link to="/feed">
          <Button
            className="green-button"
            size="large"
            style={{ width: buttonSize }}
          >
            Resend code
          </Button>
        </Link>
      </Col>
    </div>
  );
}

export default ActivationPage;
