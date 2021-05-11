import React, { useState } from "react";
import { Layout, Button } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";

const { Content } = Layout;

function HomePage() {
  const [user] = useLocalStorage("user");
  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <Layout style={{ ...styles.mainArea }}>
            <Content style={{ ...styles.paleBackground, ...styles.middle }}>
              <div onClick={() => console.log("user home", user)}>
                {user ? (
                  <>
                    <Link to="/feed">
                      <Button>Go explore the world of programming</Button>
                    </Link>
                    <h1>Things for user</h1>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button>Become a member</Button>
                    </Link>
                    <h1>Things for new one</h1>
                  </>
                )}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default HomePage;
