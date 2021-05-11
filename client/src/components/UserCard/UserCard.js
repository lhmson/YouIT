import React from "react";
import { Button, Row, Col, Divider, Form, Typography, Input, Card } from "antd";
import { Avatar, Image, Tag } from "antd";
import styles from "./styles.js";

const { Title, Text } = Typography;

function UserCard(props) {
  const { name } = props;
  const [txtButton, setTxtButton] = React.useState(
    props.relationship ?? "Add friend"
  );
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
              src="https://vtv1.mediacdn.vn/thumb_w/650/2020/10/20/blackpink-lisa-mac-160316252527410005928.jpg"
            />

            <div className="col-8" style={{ alignSelf: "center" }}>
              <Text style={styles.textUser}>{name ?? "Lalisa Manobal"}</Text>
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
            className="col-4"
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                if (txtButton === "Add friend") setTxtButton("Cancel Request");
                else setTxtButton("Add friend");
              }}
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
              }}
            >
              {txtButton}
            </Button>
            <div>
              <Text style={styles.text}>12 bạn chung</Text>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <div className="col-10">
            <Tag style={styles.tag}>C#</Tag>
            <Tag style={styles.tag}>Javascript</Tag>
            <Tag style={styles.tag}>Unity 3D</Tag>
            <Text style={{ ...styles.text, fontWeight: 600 }}>15 bài viết</Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
