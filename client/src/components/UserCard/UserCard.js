import React from "react";
import { Button, Row, Col, Divider, Form, Typography, Input, Card } from "antd";
import { Avatar, Image, Tag } from "antd";
import styles from "./styles.js";

const { Title, Text } = Typography;

function UserCard() {
  return (
    <>
      <div style={styles.card}>
        <div className="row ml-2" style={{ justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              size={72}
              src="https://vtv1.mediacdn.vn/thumb_w/650/2020/10/20/blackpink-lisa-mac-160316252527410005928.jpg"
            />

            <div className="col-8" style={{ alignSelf: "center" }}>
              <Text style={styles.textUser}>Lalisa Manobal</Text>
              <div style={{ marginTop: 0 }}></div>
              <Text>React Native Developer</Text>
            </div>
            <div
              style={{
                marginLeft: 0,
                justifyContent: "center",
                flex: 1,
                display: "flex",
              }}
            ></div>
          </div>

          <div
            className="mr-3"
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              className="mb-2"
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
              }}
            >
              Kết bạn
            </Button>
            <div>
              <Text style={styles.text}>12 bạn chung</Text>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="ml-4">
            <Tag className="tag">C#</Tag>
            <Tag className="tag">Javascript</Tag>
            <Tag className="tag">Unity 3D</Tag>
            <Text style={{ ...styles.text, fontWeight: 600 }}>15 bài viết</Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
