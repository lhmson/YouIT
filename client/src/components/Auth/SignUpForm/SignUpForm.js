import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../redux/actions/auth";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

const { Title } = Typography;

const initialState = {
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  username: "",
  confirmPassword: "",
};

function SignUpForm({ setIsSignIn }) {
  const [form, setForm] = useState(initialState);
  const [user, setUser] = useLocalStorage("user");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, []);

  const switchSignin = () => {
    setIsSignIn(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (values) => {
    console.log("form data", form);
    dispatch(signup(form, history, setUser));
    console.log("Success:", values);
  };

  const handleFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Title className="text-center">Sign up</Title>
      <Form
        {...styles.layout}
        autoComplete="off"
        noValidate
        name="basic"
        initialValues={{}}
        onFinish={handleSubmit}
        onFinishFailed={handleFailed}
      >
        <Form.Item
          label="First name"
          name="firstname"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input name="firstname" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lastname"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input name="lastname" onChange={handleChange} />
        </Form.Item>

        {/* <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input name="username" onChange={handleChange} />
        </Form.Item> */}

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input a valid email",
              type: "email",
            },
          ]}
        >
          <Input name="email" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password name="password" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please input the same password!" },
          ]}
        >
          <Input.Password name="confirmPassword" onChange={handleChange} />
        </Form.Item>

        {/* <Form.Item {...styles.tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <Form.Item {...styles.tailLayout}>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
          <Button htmlType="button" onClick={switchSignin}>
            Go to signin
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default SignUpForm;
