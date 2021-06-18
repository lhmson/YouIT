import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography } from "antd";
import styles from "./styles.js";

import { useDispatch } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import { SignInForm } from "../../../components/index";

const { Content } = Layout;

function AuthAdminPage() {
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
              <SignInForm setIsSignIn={setIsSignIn} />)
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default AuthAdminPage;
