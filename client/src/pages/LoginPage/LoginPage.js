import React, { useRef, useState } from "react";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Input,
  Form,
  Checkbox,
  message,
} from "antd";

import logo from "../../assets/lightlogo.png";
import loginImage from "../../assets/login.png";
import { GoogleLogin } from "react-google-login";
import { GrGoogle, GrFacebook } from "react-icons/gr";
import { SiGithub } from "react-icons/si";
import { signin } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import COLOR from "../../constants/colors";
import { useToken } from "../../context/TokenContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { resendVerificationMail } from "../../api/auth";
import { AUTH } from "../../redux/actionTypes";
import * as apiAuth from "../../api/auth";
import { BACKEND_URL, GITHUB_CLIENT_ID } from "../../constants/config";

const { Title, Text } = Typography;

const initialState = {
  email: "",
  password: "",
  remember: "",
};

function LoginPage() {
  const [form, setForm] = useState(initialState);
  const [user, setUser] = useLocalStorage("user");
  const dispatch = useDispatch();
  const history = useHistory();
  const [resend, setResend] = useState(false);
  const disableLogin = useRef(false);

  const [token, setToken] = useToken();

  const setDisableLogin = (b) => {
    disableLogin.current = b;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (resend === true) setResend(false);
  };

  const handleFinish = async (values) => {
    if (disableLogin.current === false) {
      console.log("handle login");
      setDisableLogin(true);
      const browserId = JSON.parse(localStorage.getItem("browser"))?.id;
      dispatch(
        signin(
          { ...form, browserId },
          history,
          setUser,
          token,
          setToken,
          setResend,
          setDisableLogin
        )
      );
    }
  };

  const handleResend = async () => {
    resendVerificationMail(form.email);
    message.success("Verification mail sent!");
  };

  const handleFinishFailed = (errorInfo) => {
    errorInfo.errorFields.forEach((err) => {
      message.error(err.errors[0]);
    });
  };

  //#region google sign in

  const googleSuccess = async (res) => {
    console.log("google signin", res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      //TODO: handle google sign in with Nghia, for browser token bla bla
      // dispatch({ type: AUTH, data: { result, token, setUser } });

      history.push("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {
    // message.error("Google Sign In was unsuccessful. Try again later");
    console.log("error google login", error);
  };

  //#endregion

  //#region github
  const handleLoginGithub = () => {
    const redirect_uri = `${BACKEND_URL}/user/login/github/callback`;
    const browserId = JSON.parse(localStorage.getItem("browser"))?.id;
    window.location.replace(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}&browserId=${browserId}`
    );
  };

  //#endregion

  return (
    <div
      className="full d-flex align-items-center justify-content-center"
      style={{ backgroundColor: COLOR.greenSmoke }}
    >
      <div
        style={{
          width: 900,
          paddingBottom: 0,
        }}
      >
        <Card className="shadow-lg rounded" bordered={false}>
          <Row style={{ alignItems: "center" }}>
            <div
              className="col-md-6"
              style={{ paddingRight: 24, marginBottom: 24 }}
            >
              <div className="row">
                <Link to="/">
                  <img src={logo} alt="Logo" height="58" className="mr-2" />
                </Link>
                <Title style={{ marginBottom: 8 }}>Login</Title>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Text>
                  No account?{" "}
                  <Link to="/register">
                    <Text className="clickable green bold">Create one!</Text>
                  </Link>
                </Text>
              </div>
              <Form
                name="basic"
                size="large"
                onFinish={resend ? handleResend : handleFinish}
                onFinishFailed={handleFinishFailed}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Invalid email.",
                    },
                    {
                      required: true,
                      message: "Email is required.",
                    },
                  ]}
                >
                  <Input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Password is required.",
                    },
                  ]}
                >
                  <Input.Password
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form.Item>
                <Row justify="end" style={{ marginBottom: 24 }}>
                  {/* <Checkbox name="remember" onChange={handleChange}>
                    Remember me
                  </Checkbox> */}
                  <Text className="clickable green ">Forgot password?</Text>
                </Row>

                <Form.Item style={{ marginBottom: 16 }}>
                  <Button
                    style={{ width: "100%" }}
                    className="green-button"
                    htmlType="submit"
                  >
                    {resend ? "Resend verification mail" : "Sign in"}
                  </Button>
                </Form.Item>
                <div
                  className="d-flex justify-content-center"
                  style={{ marginBottom: 16 }}
                >
                  <Text>Or login with</Text>
                </div>
                <Row>
                  <Col xs={24} lg={12} style={{ padding: 4 }}>
                    <GoogleLogin
                      clientId="870911963949-uhovihqpkloivbqnk2c5vgchedih3ej5.apps.googleusercontent.com"
                      render={(renderProps) => (
                        <Button
                          className="google-container"
                          // htmlType="submit"
                          icon={
                            <GrGoogle
                              style={{ marginBottom: 2.5, marginRight: 12 }}
                            />
                          }
                          onClick={renderProps.onClick}
                          // disabled={renderProps.disabled}
                          style={{ width: "100%" }}
                        >
                          Google
                        </Button>
                      )}
                      onSuccess={googleSuccess}
                      onFailure={googleError}
                      cookiePolicy="single_host_origin"
                    />
                  </Col>
                  {/* <Col xs={24} lg={8} style={{ padding: 4 }}>
                    <Button
                      className="facebook-container"
                      // htmlType="submit"
                      icon={
                        <GrFacebook
                          style={{ marginBottom: 2.5, marginRight: 12 }}
                        />
                      }
                      style={{ width: "100%" }}
                    >
                      Facebook
                    </Button>
                  </Col> */}
                  <Col xs={24} lg={12} style={{ padding: 4 }}>
                    <Button
                      className="github-container"
                      // htmlType="submit"
                      icon={
                        <SiGithub
                          style={{ marginBottom: 2.5, marginRight: 12 }}
                        />
                      }
                      onClick={() => handleLoginGithub()}
                      style={{ width: "100%" }}
                    >
                      Github
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
            <div
              className="col-md-5 d-md-block d-sm-none d-none"
              style={{ justifyItems: "center" }}
            >
              <div>
                <img
                  src={loginImage}
                  alt="Register"
                  height="400"
                  // className="object-fit"
                  // height="58"
                  // className="mr-2"
                />
              </div>
            </div>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
