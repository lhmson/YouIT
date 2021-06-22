import React, { useEffect, useState } from "react";
import { Button, Typography, Col } from "antd";
import styles from "./styles";
import { Link } from "react-router-dom";
const { Title } = Typography;

const buttonSize = 150;

function ErrorPage({ code }) {
  var errors = [
    {
      code: "400",
      name: "400 BAD REQUEST",
      desc: "There was a problem with the request.",
    },
    {
      code: "403",
      name: "403 FORBIDDEN",
      desc: "Stop because access to the resource is forbidden.",
    },
    {
      code: "404",
      name: "404 NOT FOUND",
      desc: "The requested resource does not exist.",
    },
    {
      code: "500",
      name: "500 INTERNAL SERVER ERROR",
      desc: "There was an error on the server.",
    },
  ];

  let error = errors.find((e) => e.code === code);
  if (!error)
    error = {
      code: "500",
      name: "500 INTERNAL SERVER ERROR",
      desc: "There was an error on the server.",
    };
  return (
    <div
      className="full d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "white" }}
    >
      <Col align="center" style={{ paddingBottom: 32 }}>
        <img
          src={require(`../../assets/errors/${code}.png`).default}
          alt="error"
          style={{ height: 250, marginBottom: 24 }}
        />
        <Title style={{ fontWeight: "lighter" }}>{error.name}</Title>
        <Title className="mb-4" level={5}>
          {error.desc}
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
