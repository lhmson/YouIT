import React, { useEffect, useState } from "react";
import { Avatar, Button, Image, Typography, Row } from "antd";
import { FaCamera } from "react-icons/fa";

import styles from "./styles.js";

import * as api from "../../../api/user_info";
import { useSelector } from "react-redux";
import { isLoginUser } from "../../../utils/user.js";
import * as apiUser from "../../../api/user_info";

const { Title } = Typography;

const AvatarView = () => {
  const user = useSelector((state) => state.user);
  const isMyProfile = isLoginUser(user);

  const [avatar, setAvatar] = useState(user?.avatarUrl);
  const [backgroundImage, setBackgroundImage] = useState(
    user?.backgroundUrl ?? "https://vnn-imgs-f.vgcloud.vn/2020/09/07/15/.jpg"
  );
  console.log("ZZ");
  console.log(user?.avatarUrl);
  console.log(avatar);
  const displayName = user?.name ?? "";

  const hiddenAvatarFileInput = React.useRef(null);
  const hiddenBackgroundFileInput = React.useRef(null);

  useEffect(() => {
    setAvatar(user?.avatarUrl);
    setBackgroundImage(
      user?.backgroundUrl ?? "https://vnn-imgs-f.vgcloud.vn/2020/09/07/15/.jpg"
    );
  }, []);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleAvatarChange = async (e) => {
    const fileUploaded = e.target.files[0];
    const base64 = await convertFileToBase64(fileUploaded);

    const image = {
      type: "avatarUrl",
      base64: base64,
    };
    const { data } = await apiUser.editImage(image);
    setAvatar(base64);
    console.log(data);
  };

  const handleBackgroundChange = async (e) => {
    const fileUploaded = e.target.files[0];
    const base64 = await convertFileToBase64(fileUploaded);
    setBackgroundImage(base64);
  };

  const EditImageButton = () => {
    if (isMyProfile) {
      return (
        <div>
          <Button
            className="green-button mr-2"
            style={styles.editImageBtn}
            onClick={() => hiddenBackgroundFileInput.current.click()}
          >
            Edit image
          </Button>
          <input
            type="file"
            ref={hiddenBackgroundFileInput}
            style={{ display: "none" }}
            onChange={handleBackgroundChange}
          ></input>
        </div>
      );
    }
    return <></>;
  };

  const EditAvatarButton = () => {
    if (isMyProfile) {
      return (
        <div>
          <Button
            className="green-button"
            shape="circle"
            style={styles.editAvatarBtn}
            icon={<FaCamera />}
            onClick={() => hiddenAvatarFileInput.current.click()}
          ></Button>
          <input
            type="file"
            ref={hiddenAvatarFileInput}
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          ></input>
        </div>
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
            src={backgroundImage}
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
            <Avatar src={avatar} size={150} style={styles.avatar} />
            <EditAvatarButton />
          </div>

          <Title style={styles.displayName}>{displayName}</Title>
        </div>
      </Row>
    </div>
  );
};

export default AvatarView;
