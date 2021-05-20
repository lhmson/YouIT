import React from "react";
import { Avatar, Typography, Layout, Row } from "antd";
import { Link } from "react-router-dom";

import * as api from "../../../api/user_info";
import { useSelector } from "react-redux";
import { isLoginUser } from "../../../utils/user.js";
import COLOR from "../../../constants/colors";

const { Title, Text } = Typography;

const CreateGroupNameAdmin = () => {
  const user = useSelector((state) => state.user);

  const avatarUrl =
    user?.avatarUrl ??
    "https://pbs.twimg.com/profile_images/1247161286518964226/m92qVTIT_400x400.jpg";

  const displayName = user?.name ?? "Nguoi dung YouIT";

  return (
    <Row style={{ marginBottom: 18, marginTop: 18 }}>
      <Link to="/">
        <Avatar
          src={avatarUrl}
          alt="avatar"
          className="ml-1 clickable"
          size={80}
        />
      </Link>
      <Layout style={{ background: COLOR.white }}>
        <Text
          className="clickable"
          strong
          style={{ marginLeft: 15, fontSize: "1.8rem" }}
        >
          {displayName}
        </Text>
        <Text style={{ marginLeft: 15, fontSize: 16 }}>Admin</Text>
      </Layout>
    </Row>
  );
};

export default CreateGroupNameAdmin;
