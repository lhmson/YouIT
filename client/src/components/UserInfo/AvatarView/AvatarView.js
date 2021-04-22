import React from "react";
import { Avatar, Button, Image, Typography } from "antd";
import { FaCamera } from "react-icons/fa";

import styles from "./styles.js";

const { Title } = Typography;

const AvatarView = (props) => {
  const avatarUrl =
    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

  return (
    <div className="container" style={{ marginBottom: 50, height: 400 }}>
      <div className="row">
        <Image
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          width="100%"
          height={320}
        ></Image>
        <Button type="primary" style={styles.editImageBtn}>
          Edit image
        </Button>
        <Avatar src={avatarUrl} size={150} style={styles.avatar} />
        <Button type="primary" shape="circle" style={styles.editAvatarBtn}>
          <FaCamera style={{ marginTop: 2 }} />
        </Button>
        <Title style={styles.displayName}>{props.displayName}</Title>
      </div>
    </div>
  );
};

export default AvatarView;
