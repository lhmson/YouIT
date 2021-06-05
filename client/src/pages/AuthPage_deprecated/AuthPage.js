import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography } from "antd";
import styles from "./styles.js";

import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import SignInForm from "../../components/Auth/SignInForm/SignInForm.js";
import SignUpForm from "../../components/Auth/SignUpForm/SignUpForm.js";

const { Content } = Layout;
const { Title, Text } = Typography;

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <Layout style={{ padding: "24px" }}>
            <Content style={{ ...styles.paleBackground, ...styles.mainArea }}>
              {isSignIn ? (
                <SignInForm setIsSignIn={setIsSignIn} />
              ) : (
                <SignUpForm setIsSignIn={setIsSignIn} />
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default AuthPage;
