import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { signin } from "../../../redux/actions/auth";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

import { GoogleLogIn } from "react-google-login";

const { Title } = Typography;

const initialState = {
  email: "",
  password: "",
  // firstname: "",
  // lastname: "",
  // confirmPassword: "",
};

function SignInForm({ setIsSignIn }) {
  const [form, setForm] = useState(initialState);
  const [user, setUser] = useLocalStorage("user");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => { }, []);

  const switchSignup = () => {
    setIsSignIn(false);
  };

  // const googleSuccess = async (res) => {
  //   const result = res?.userObj;
  //   const token = res?.tokenId;
  //   try {
  //     dispatch({ type: AUTH, data: { result, token } });
  //     history.push('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googleError = () => {
  //   alert("Google Sign In was unsuccessful. Try again later");
  // };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (values) => {
  //   console.log("form data", form);
  //   dispatch(signin(form, history, setUser));
  //   console.log("Success:", values);
  // };

  const handleFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Title className="text-center">Sign in</Title>
      <Form
        {...styles.layout}
        autoComplete="off"
        noValidate
        name="basic"
        initialValues={{}}
        // onFinish={handleSubmit}
        onFinishFailed={handleFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
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

        {/* <Form.Item
          {...styles.tailLayout}
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item {...styles.tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button htmlType="button" onClick={switchSignup}>
            Go to signup
          </Button>
        </Form.Item>

        {/* <Form.Item {...styles.tailLayout}>
          <GoogleLogIn
            clientId="GOOGLE id"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
        </Form.Item> */}
      </Form>
    </>
  );
}

export default SignInForm;
