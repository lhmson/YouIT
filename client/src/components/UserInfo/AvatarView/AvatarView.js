import React from "react";
import { Avatar, Button, Image, Typography, Row } from "antd";
import { FaCamera } from "react-icons/fa";

import styles from "./styles.js";

const { Title } = Typography;

const AvatarView = (props) => {
  const avatarUrl =
    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

  return (
    <div style={{ position: "relative", height: "60vh" }}>
      <Row
        className="container justify-content-center"
        style={{ height: "40vh" }}
      >
        <div>
          <Image
            src="https://vnn-imgs-f.vgcloud.vn/2020/09/07/15/.jpg"
            style={{
              maxHeight: "40vh",
              width: "100%",
              objectFit: "cover",
              height: "auto",
              display: "block",
            }}
          ></Image>
        </div>
        <Button type="primary" style={styles.editImageBtn}>
          Edit image
        </Button>
        <div
          className="d-flex justify-content-center flex-column align-items-center"
          style={{ position: "absolute", bottom: "10%" }}
        >
          <div style={{ position: "relative" }}>
            <Avatar src={avatarUrl} size={150} style={styles.avatar} />
            <Button type="primary" shape="circle" style={styles.editAvatarBtn}>
              <FaCamera />
            </Button>
          </div>

          <Title style={styles.displayName}>{props.displayName}</Title>
        </div>
      </Row>
    </div>
  );
};

export default AvatarView;
