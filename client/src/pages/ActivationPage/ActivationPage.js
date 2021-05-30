import React, { useEffect, useState } from "react";
import { Button, Typography, Col, message } from "antd";
import styles from "./styles";
import { Link, useHistory } from "react-router-dom";
import * as userApi from "../../api/auth";
import decode from "jwt-decode";

const { Title } = Typography;

const buttonSize = 150;

function ActivationPage(props) {
  const { token } = props.match.params;
  console.log("token", token);
  const history = useHistory();
  const [pageType, setPageType] = useState("loading");
  // const verify = async () => {
  //   try {
  //     await userApi.verifyToken(token);
  //   } catch (error) {
  //     console.log("error", error.message.data);
  //   }
  // };
  useEffect(() => {
    if (token) {
      userApi
        .verifyToken(token)
        .then((user) => {
          setPageType("success");
          history.push("/login");
          message.success("Activation sucessfully, please login.");
        })
        .catch((err) => {
          console.log("response from server", err);
          const mess = err?.response;
          if (mess?.status === 410) {
            if (mess?.data?.name === "TokenExpiredError") {
              setPageType("expired");
            } else {
              history.push("/error404");
              message.error("Invalid verification link.");
            }
          } else if (mess?.status === 409) {
            setPageType("success");
            history.push("/login");
            message.error("User already activated.");
          }
        });
    }
  }, []);

  const handleResend = () => {
    if (pageType === "expired" && token) {
      const decodedToken = decode(token);
      userApi.resendVerificationMail(decodedToken.email);
    }
  };
  return pageType === "loading" ? (
    <div
      className="full d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "white" }}
    >
      <Col align="center" style={{ paddingBottom: 32 }}>
        <img
          src={require(`../../assets/loading.png`).default}
          alt="error"
          style={{ height: 250, marginBottom: 24 }}
        />
        <div>
          <Title style={{ fontWeight: "lighter" }}>Processing request</Title>
          <Title className="mb-4" level={5}>
            "Waiting is happiness"
          </Title>
        </div>
      </Col>
    </div>
  ) : (
    <div
      className="full d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "white" }}
    >
      <Col align="center" style={{ paddingBottom: 32 }}>
        <img
          src={require(`../../assets/mail/${pageType}.png`).default}
          alt="error"
          style={{ height: 250, marginBottom: 24 }}
        />
        {pageType === "success" ? (
          <div>
            <Title style={{ fontWeight: "lighter" }}>Email verified</Title>
            <Title className="mb-4" level={5}>
              Redirecting you back to login page.
            </Title>
          </div>
        ) : (
          <div>
            <Title style={{ fontWeight: "lighter" }}>
              Verification mail expired
            </Title>
            <Title className="mb-4" level={5}>
              Please resend verification mail.
            </Title>
          </div>
        )}
        <Link to="/login">
          <Button
            className="white-button mr-3"
            size="large"
            style={{ width: buttonSize }}
          >
            Back
          </Button>
        </Link>
        {pageType === "success" ? (
          <div></div>
        ) : (
          <Button
            className="green-button"
            size="large"
            onClick={handleResend}
            style={{ width: buttonSize }}
          >
            Resend code
          </Button>
        )}
      </Col>
    </div>
  );
}

export default ActivationPage;
