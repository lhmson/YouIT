import React, { useEffect, useState } from "react";
import { Button, Typography, Col } from "antd";
import styles from "./styles";
import { Link } from "react-router-dom";
const { Title } = Typography;

const buttonSize = 150;

function ErrorPage({ code }) {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    switch (code) {
      case "400":
        setInfo({
          name: "400 BAD REQUEST",
          desc: "There was a problem with the request.",
        });
        break;
      case "403":
        setInfo({
          name: "403 FORBIDDEN",
          desc: "Access to the resource is forbidden.",
        });
        break;
      case "404":
        setInfo({
          name: "404 NOT FOUND",
          desc: "The requested resource does not exist.",
        });
        break;
      case "500":
        setInfo({
          name: "500 INTERNAL SERVER ERROR",
          desc: "There was an error on the server.",
        });
        break;
      default:
        setInfo({
          name: "400 BAD REQUEST",
          desc: "There was a problem with the request.",
        });
    }
  }, []);

  return (
    <div
      className="full d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "white" }}
    >
      <Col align="center" style={{ paddingBottom: 32 }}>
        <img
          src={require(`../../assets/errors/${code}.png`).default}
          alt="error"
          style={{ width: 400, marginBottom: 24 }}
        />
        <Title style={{ fontWeight: "lighter" }}>{info?.name}</Title>
        <Title className="mb-4" level={5}>
          {info?.desc}
        </Title>
        <a href={`https://en.wikipedia.org/wiki/HTTP_${code}`} target="_blank">
          <Button
            className="white-button mr-3"
            size="large"
            style={{ width: buttonSize }}
          >
            Find out why
          </Button>
        </a>
        <Link to="/feed">
          <Button
            className="green-button"
            size="large"
            style={{ width: buttonSize }}
          >
            Take me home
          </Button>
        </Link>
      </Col>
    </div>
  );
}

ErrorPage.defaultProps = {
  code: "500",
};

export default ErrorPage;
