import React, { useEffect, useState } from "react";
import { Avatar, Button, Image, Typography, Row } from "antd";
import { FaCamera } from "react-icons/fa";

import styles from "./styles.js";

import * as api from "../../../api/user_info";
import { useSelector } from "react-redux";
import { isLoginUser } from "../../../utils/user.js";

const { Title } = Typography;

const AvatarView = () => {
  const user = useSelector((state) => state.user);
  const isMyProfile = isLoginUser(user);

  const avatarUrl =
    user?.avatarUrl ??
    "https://pbs.twimg.com/profile_images/1247161286518964226/m92qVTIT_400x400.jpg";

  // const backgroundUrl = ""

  const displayName = user?.name ?? "";

  const EditImageButton = () => {
    if (isMyProfile) {
      return (
        <Button className="green-button mr-2" style={styles.editImageBtn}>
          Edit image
        </Button>
      );
    }
    return <></>;
  };

  const EditAvatarButton = () => {
    if (isMyProfile) {
      return (
        <Button
          className="green-button"
          shape="circle"
          style={styles.editAvatarBtn}
        >
          <FaCamera />
        </Button>
      );
    }
    return <></>;
  };

  return (
    <div style={{ position: "relative", height: "50vh" }}>
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
        <EditImageButton />
        <div
          className="d-flex justify-content-center flex-column align-items-center"
          style={{ position: "absolute", bottom: "-10%" }}
        >
          <div style={{ position: "relative", marginBottom: 8 }}>
            <Avatar src={avatarUrl} size={150} style={styles.avatar} />
            <EditAvatarButton />
          </div>

          <Title style={styles.displayName}>{displayName}</Title>
        </div>
      </Row>
    </div>
  );
};

export default AvatarView;
