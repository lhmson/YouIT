import React, { useRef, useState } from "react";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Input,
  Form,
  Select,
  DatePicker,
  message,
} from "antd";

// import { ReactComponent as ReactLogo } from "../../assets/add-user.svg";
import logo from "../../assets/lightlogo.png";
import addUserImage from "../../assets/add-user.png";

import styles from "./styles";
import { Link } from "react-router-dom";
import { signup } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import moment from "moment";
import COLOR from "../../constants/colors";
import { resendVerificationMail } from "../../api/auth";

const { Title, Text } = Typography;

const { Option } = Select;

const dateFormat = "DD/MM/YYYY";

const initialState = {
  newEmail: "",
  newPassword: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
};

function RegisterPage() {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const [resend, setResend] = useState(false);
  const disableReg = useRef(false);

  const setDisableReg = (b) => {
    disableReg.current = b;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e?.target.name]: e?.target.value });
    if (resend) setResend(false);
  };

  const handleChangeDob = (date) => {
    // var now = moment();
    // var input = moment(date);
    // if (now.diff(input, "years") < 18) {
    //   setDobError("You must be 18 or older.");
    // } else {
    //   setDobError(null);
    //   setForm({ ...form, dob: date });
    // }
    setForm({ ...form, dob: date });
  };

  const handleChangeGender = (value) => {
    setForm({ ...form, gender: value });
  };

  const handleFinish = (values) => {
    if (disableReg.current === false) {
      console.log("fuckfuck");
      const data = {
        email: form.newEmail,
        password: form.newPassword,
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        dob: form.dob,
      };
      setDisableReg(true);
      //TODO: unable to register for demo
      dispatch(signup(data, setResend, setDisableReg));
    }
  };

  const handleResend = () => {
    resendVerificationMail(form.newEmail);
    message.success("Verification mail sent!");
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
          width: 1000,
          paddingBottom: 0,
        }}
      >
        <Row style={{ justifyContent: "center" }}> </Row>
        <Card className="shadow-lg rounded" bordered={false}>
          <Row style={{ alignItems: "center" }}>
            <div
              className="col-md-6"
              style={{ paddingRight: 24, marginBottom: 0 }}
            >
              <Row>
                <Link to="/">
                  <img src={logo} alt="Logo" height="58" className="mr-2" />
                </Link>
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
                size="large"
                onFinish={resend ? handleResend : handleFinish}
                onFinishFailed={handleFinishFailed}
              >
                <Form.Item
                  name="newEmail"
                  rules={[
                    {
                      type: "email",
                      message: "Invalid email.",
                    },
                    {
                      required: true,
                      message: "Email is required.",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        // console.log("value", value.length);
                        if (value.length >= 6) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Password must be at least 6 characters.")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    name="newEmail"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Password is required.",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        // console.log("value", value.length);
                        if (value.length >= 6) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Password must be at least 6 characters.")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    name="newPassword"
                    autoComplete="newPassword"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Password confirm is required.",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Password does not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm password"
                    suffix={null}
                  />
                </Form.Item>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "First name is required.",
                        },
                      ]}
                    >
                      <Input
                        name="firstName"
                        placeholder="First name"
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Last name is required.",
                        },
                      ]}
                    >
                      <Input
                        name="lastName"
                        placeholder="Last name"
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={10}>
                    <Form.Item
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Gender is required.",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Gender"
                        name="gender"
                        onChange={handleChangeGender}
                        style={{ width: "100%" }}
                      >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item
                      name="dob"
                      rules={[
                        {
                          required: true,
                          message: "Date of birth is required.",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            var now = moment();
                            var input = moment(value);
                            // console.log("dob valid", now.diff(input, "years"));
                            if (!value || now.diff(input, "years") >= 13) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("You must be at least 13 years old.")
                            );
                          },
                        }),
                      ]}
                    >
                      <DatePicker
                        name="dob"
                        placeholder="Date of birth"
                        onChange={handleChangeDob}
                        style={{ width: "100%" }}
                        format={dateFormat}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item style={{}}>
                  <Button
                    style={{ width: "100%" }}
                    className="green-button"
                    htmlType="submit"
                  >
                    {resend ? "Resend verification mail" : "Create account"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div
              className="col-md-5 d-md-block d-sm-none d-none"
              style={{ marginTop: 0 }}
            >
              <div>
                <img
                  src={addUserImage}
                  alt="Register"
                  height="450"
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

export default RegisterPage;
