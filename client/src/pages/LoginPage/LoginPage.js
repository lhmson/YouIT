import React from "react";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Input,
  Form,
  Checkbox,
} from "antd";
import { FacebookFilled } from "@ant-design/icons";

import { ReactComponent as ReactLogo } from "../../assets/login-bro.svg";
import logo from "../../assets/lightlogo.png";

import styles from "./style";
import { FaFacebookF, FaFacebookSquare } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { SiGithub } from "react-icons/si";

const { Title, Text, Paragraph } = Typography;

function LoginPage() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="full d-flex align-items-center justify-content-center">
      <div
        style={{
          width: 900,
          paddingBottom: 50,
        }}
      >
        <Row style={{ justifyContent: "center" }}> </Row>
        <Card className="shadow-lg rounded" bordered={false}>
          <Row>
            <Col span={12} style={{ paddingRight: 24, marginBottom: 24 }}>
              <Row>
                <img src={logo} alt="Logo" height="58" className="mr-2" />
                <Title style={{ marginBottom: 8 }}>Login</Title>
              </Row>
              <div style={{ marginBottom: 16 }}>
                <Text>
                  No account?{" "}
                  <Text className="clickable green bold">Create one!</Text>
                </Text>
              </div>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                size="large"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                  style={styles.formItem}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  style={styles.formItem}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Row justify="space-between">
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Text className="clickable green mt-2">Forgot password?</Text>
                </Row>

                <Form.Item style={styles.formItem}>
                  <Button
                    style={{ width: "100%" }}
                    className="green-container"
                    htmlType="submit"
                  >
                    Sign in
                  </Button>
                </Form.Item>
                <div
                  className="d-flex justify-content-center"
                  style={styles.formItem}
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
