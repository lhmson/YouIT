import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { Button } from "antd";
import FriendCard from "../../components/FriendCard/FriendCard";

const { Content } = Layout;
const { Title, Text } = Typography;

function FriendMangementPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [modeSearch, setModeSearch] = useState("User");

  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <Layout style={styles.mainArea}>
            <Content>
              <div
                className="col-8 offset-2"
                style={{
                  marginTop: 64,
                }}
              >
                <div
                  className="row"
                  style={{ background: "white", paddingTop: 16 }}
                >
                  <div
                    className="col-6"
                    style={{
                      background: "white",
                    }}
                  >
                    <Title>Friends</Title>
                  </div>
                  <div className="col-2 offset-1">
                    <Button
                      type="primary"
                      style={{
                        background: "#27AE60",
                        borderColor: "#27AE60",
                        color: "white",
                        fontWeight: 500,
                      }}
                    >
                      Invites (5)
                    </Button>
                  </div>

                  <div className="col-2">
                    <Button
                      type="primary"
                      style={{
                        background: "#27AE60",
                        borderColor: "#27AE60",
                        color: "white",
                        fontWeight: 500,
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      Friends(503)
                    </Button>
                  </div>
                </div>

                <div className="row" style={{ marginTop: 16 }}>
                  <div
                    className="col-9"
                    style={{ height: 32, background: "white" }}
                  ></div>
                  <div
                    className="col-3"
                    style={{ height: 32, background: "#27AE60" }}
                  ></div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <FriendCard></FriendCard>
                    <FriendCard></FriendCard>
                    <FriendCard></FriendCard>
                    <FriendCard></FriendCard>
                  </div>
                  <div className="col-6">
                    <FriendCard></FriendCard>
                    <FriendCard></FriendCard>
                    <FriendCard></FriendCard>
                    <FriendCard></FriendCard>
                  </div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default FriendMangementPage;
