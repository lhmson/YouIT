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
  Select,
} from "antd";
import { FacebookFilled } from "@ant-design/icons";

import { ReactComponent as ReactLogo } from "../../assets/add-user.svg";
import logo from "../../assets/lightlogo.png";

import styles from "./styles";
import { FaFacebookF, FaFacebookSquare } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { SiGithub } from "react-icons/si";
import { Option } from "antd/lib/mentions";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

function RegisterPage() {
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
                <Title style={{ marginBottom: 8 }}>Register</Title>
              </Row>
              <div style={{ marginBottom: 16 }}>
                <Text>
                  Already have an account?{" "}
                  <Link to="/login">
                    <Text className="clickable green bold">Log in</Text>
                  </Link>
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
                  <Input autoComplete="off" placeholder="Email" />
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
                  <Input.Password autoComplete="off" placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Password does not mach!",
                    },
                  ]}
                  style={styles.formItem}
                >
                  <Input.Password placeholder="Confirm password" />
                </Form.Item>
                <Form.Item
                  name="gender"
                  style={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: "Gender is required",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Sex"
                    // onChange={handleChange}
                  >
                    <Option value="others">Rather not to say</Option>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Invalid phone number",
                    },
                  ]}
                  style={styles.formItem}
                >
                  <Input placeholder="Phone number" />
                </Form.Item>

                <Form.Item style={styles.formItem}>
                  <Button
                    style={{ width: "100%" }}
                    className="green-container"
                    htmlType="submit"
                  >
                    Create account
                  </Button>
                </Form.Item>
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

export default RegisterPage;
