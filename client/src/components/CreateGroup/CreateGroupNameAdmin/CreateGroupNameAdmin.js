import React, { useEffect } from "react";
import { Avatar, Typography, Row, Space } from "antd";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../../context/CurrentUserContext";
const { Text } = Typography;

const CreateGroupNameAdmin = () => {
  //TODO: should get from a redux or context user
  // const [user] = useLocalStorage("user");
  const [currentUser] = useCurrentUser();
  const displayName = currentUser?.name ?? "";

  const avatarUrl =
    currentUser?.avatarUrl ??
    "https://pbs.twimg.com/profile_images/1247161286518964226/m92qVTIT_400x400.jpg";

  return (
    <Row className="pb-2 justify-content-between align-items-center">
      <Row className="align-items-center" style={{ marginBottom: 16 }}>
        <Avatar
          className="ml-1 clickable"
          size={70}
          src={avatarUrl}
          alt={currentUser?.name}
        />
        <div className="d-inline-flex flex-column ml-3 break-word">
          <Row className="align-items-center">
            <Space size={4}>
              <Link to={`/userinfo/${currentUser?._id}`} target="_blank">
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
