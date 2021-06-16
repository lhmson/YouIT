import React, { useEffect } from "react";
import { Avatar, Typography, Row, Space } from "antd";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { useSelector } from "react-redux";
const { Title, Text } = Typography;

const CreateGroupNameAdmin = () => {
  const [user] = useLocalStorage("user");
  // const user = useSelector((state) => state.user);
  const displayName = user?.result?.name ?? "";

  const avatarUrl =
    user?.avatarUrl ??
    "https://pbs.twimg.com/profile_images/1247161286518964226/m92qVTIT_400x400.jpg";

  return (
    <Row className="pb-2 justify-content-between align-items-center">
      <Row className="align-items-center" style={{ marginBottom: 16 }}>
        <Avatar className="ml-1 clickable" size={70} src={avatarUrl} />
        <div className="d-inline-flex flex-column ml-3 break-word">
          <Row className="align-items-center">
            <Space size={4}>
              <Link to={`/userinfo/${user?.result?._id}`} target="_blank">
                <Text
                  className="clickable"
                  strong
                  style={{ fontSize: "1.2rem" }}
                >
                  {displayName}
                </Text>
              </Link>
            </Space>
          </Row>
          <Text>Owner</Text>
        </div>
      </Row>
    </Row>
  );
};

export default CreateGroupNameAdmin;
