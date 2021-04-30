import React, { useEffect, useState } from "react";
import { Avatar, Button, Image, Typography, Row } from "antd";
import { FaCamera } from "react-icons/fa";

import styles from "./styles.js";

import * as api from "../../../api/user_info";

const { Title } = Typography;

const AvatarView = () => {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://pbs.twimg.com/profile_images/1247161286518964226/m92qVTIT_400x400.jpg"
  );

  const [displayName, setDisplayName] = useState("Nguoi dung YouIT");

  const handleFetchUserInfo = (user) => {
    setAvatarUrl(user.avatarUrl);
    console.log("userName: " + user.name);
    setDisplayName(user.name);
  };

  useEffect(async () => {
    console.log("start fetching user");

    const localUserInfo = JSON.parse(localStorage.getItem("user"));
    console.log("local: " + localUserInfo);
    console.log("localId: " + localUserInfo?.result?._id);

    const user = await api.fetchUserInfo(localUserInfo?.result?._id);

    console.log("user:: ", user.data);
    handleFetchUserInfo(user.data);
  }, []);

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
          <div style={{ position: "relative", marginBottom: 8 }}>
            <Avatar src={avatarUrl} size={150} style={styles.avatar} />
            <Button type="primary" shape="circle" style={styles.editAvatarBtn}>
              <FaCamera />
            </Button>
          </div>

          <Title style={styles.displayName}>{displayName}</Title>
        </div>
      </Row>
    </div>
  );
};

export default AvatarView;
