import React, { useState } from "react";
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

import { ReactComponent as ReactLogo } from "../../assets/login-bro.svg";
import logo from "../../assets/lightlogo.png";
import { GrFacebook } from "react-icons/gr";
import { SiGithub } from "react-icons/si";
import { signin } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import COLOR from "../../constants/colors";
import { useToken } from "../../context/TokenContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const { Title, Text, Paragraph } = Typography;

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

  const [token, setToken] = useToken();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFinish = async (values) => {
    const browserId = JSON.parse(localStorage.getItem("browser"))?.id;
    dispatch(signin({ ...form, browserId }, history, setUser, token, setToken));
  };

  const handleFinishFailed = (errorInfo) => {
    errorInfo.errorFields.map((err) => {
      message.error(err.errors[0]);
    });
  };

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
        <Row style={{ justifyContent: "center" }}> </Row>
        <Card className="shadow-lg rounded" bordered={false}>
          <Row>
            <Col span={12} style={{ paddingRight: 24, marginBottom: 24 }}>
              <Row>
                <Link to="/">
                  <img src={logo} alt="Logo" height="58" className="mr-2" />
                </Link>
                <Title style={{ marginBottom: 8 }}>Login</Title>
              </Row>
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
                onFinish={handleFinish}
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
                <Row justify="space-between" style={{ marginBottom: 24 }}>
                  <Checkbox name="remember" onChange={handleChange}>
                    Remember me
                  </Checkbox>
                  <Text className="clickable green ">Forgot password?</Text>
                </Row>

                <Form.Item style={{ marginBottom: 16 }}>
                  <Button
                    style={{ width: "100%" }}
                    className="green-button"
                    htmlType="submit"
                  >
                    Sign in
                  </Button>
                </Form.Item>
                <div
                  className="d-flex justify-content-center"
                  style={{ marginBottom: 16 }}
                >
                  <Text>Or login with</Text>
                </div>
                <Row>
                  <Col span={12} style={{ paddingRight: 8 }}>
                    <Button
                      className="facebook-container"
                      htmlType="submit"
                      icon={
                        <GrFacebook
                          style={{ marginBottom: 2.5, marginRight: 12 }}
                        />
                      }
                      style={{ width: "100%" }}
                    >
                      Facebook
                    </Button>
                  </Col>
                  <Col span={12} style={{ paddingLeft: 8 }}>
                    <Button
                      className="github-container"
                      htmlType="submit"
                      icon={
                        <SiGithub
                          style={{ marginBottom: 2.5, marginRight: 12 }}
                        />
                      }
                      style={{ width: "100%" }}
                    >
                      Github
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span={12}>
              <div>
                <ReactLogo />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
