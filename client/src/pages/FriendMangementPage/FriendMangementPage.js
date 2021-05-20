import React, { useState, useEffect, useRef } from "react";
import { Layout, Typography, Input } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { Button } from "antd";
import FriendCard from "../../components/FriendCard/FriendCard";
import COLOR from "../../constants/colors";

import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

function FriendMangementPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [modeSearch, setModeSearch] = useState("User");
  const inputRef = useRef();
  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <Layout style={styles.mainArea}>
            <Content>
              <div
                className="col-8 offset-2 "
                style={{
                  marginTop: 64,
                  alignItems: "center",
                }}
              >
                <div className="row" style={{ paddingTop: 16 }}>
                  <div
                    className="col-8"
                    style={{
                      // background: "white",
                      paddingLeft: 32,
                    }}
                  >
                    <Title>Friends</Title>
                  </div>
                  <div className="d-flex justify-content-end">
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

                <div
                  className="row"
                  style={{
                    marginTop: 8,
                    marginBottom: 16,
                    paddingLeft: 32,
                    paddingRight: 32,
                  }}
                >
                  <Input
                    onPressEnter={() => {}}
                    allowClear
                    suffix={
                      <SearchOutlined
                        onClick={() => {}}
                        style={{ fontSize: 24, color: COLOR.white }}
                      />
                    }
                    ref={inputRef}
                    bordered={false}
                    style={{
                      backgroundColor: COLOR.lightGreen,
                    }}
                    defaultValue={""}
                  />
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
