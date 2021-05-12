import React from "react";
import { Button, Row, Col, Divider, Form, Typography, Input, Card } from "antd";
import { Avatar, Image, Tag } from "antd";
import styles from "./styles.js";

const { Title, Text } = Typography;

function GroupCard() {
  return (
    <>
      <div style={styles.card}>
        <div className="row">
          <div
            className="col-8"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              size={72}
              src="https://i.pinimg.com/originals/00/5b/36/005b36c78f2ba0585416fccd55d58439.jpg"
            />

            <div className="col-8" style={{ alignSelf: "center" }}>
              <Text style={styles.textUser}>BlackPink</Text>
              <div style={{ marginTop: 0 }}></div>
              <Text>"BlackPink in your area"</Text>
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
            className="col-4"
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Button
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
              }}
            >
              Tham gia
            </Button>
            <div>
              <Text style={styles.text}>10M thành viên</Text>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <div className="col-10">
            <Tag style={styles.tag}>Lisa</Tag>
            <Tag style={styles.tag}>Rosé</Tag>
            <Tag style={styles.tag}>Jennie</Tag>
            <Tag style={styles.tag}>Jisoo</Tag>
            <Text style={{ ...styles.text, fontWeight: 600 }}>23 bài viết</Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupCard;
