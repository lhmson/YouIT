import React from "react";
import { Button, Typography, Avatar, message, Row, Space } from "antd";
import { Link } from "react-router-dom";
import styles from "./styles.js";
import * as api from "../../api/post";

import { limitNameLength } from "../../utils/limitNameLength.js";

const { Title, Text, Paragraph } = Typography;

function PostRequests(props) {
  const { post } = props;

  const acceptPostRequest = async (id) => {
    api
      .approveGroupPost(id)
      .then((res) => {
        message.success("This post has been accepted.");
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  const removePostRequest = async (id) => {
    api
      .declineGroupPost(id)
      .then((res) => {
        message.success("This post is not accepted ");
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  return (
    <div style={styles.item}>
      <Row className="pb-2 justify-content-between align-items-center">
        <Row className="align-items-center" style={{ marginBottom: 16 }}>
          <Avatar
            className="ml-1 clickable"
            size={60}
            src={post?.userId?.avatarUrl}
          />
          <div className="d-inline-flex flex-column ml-3 break-word">
            <Row className="align-items-center">
              <Space size={4}>
                <Link to={`/userinfo/${post?.userId._id}`} target="_blank">
                  <Text
                    className="clickable"
                    strong
                    style={{ fontSize: "1.2rem" }}
                  >
                    {post?.userId?.name}
                  </Text>
                </Link>
              </Space>
            </Row>
            <Text>Fullstack Developer</Text>
          </div>
        </Row>
        <Row className="justify-content-end align-items-center pb-3">
          <div className="mr-4">
            {/* <Text className="clickable" underline type="secondary">
                Created {createdAt.toString().slice(0, 10)}
              </Text> */}
            <Button
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
                width: 120,
              }}
              onClick={() => acceptPostRequest(post?._id)}
            >
              Accept
            </Button>
          </div>
          <div className="mr-4">
            <Button
              type="ghost"
              style={{
                background: "#BDBDBD",
                borderColor: "#BDBDBD",
                color: "black",
                fontWeight: 500,
                width: 120,
              }}
              onClick={() => removePostRequest(post?._id)}
            >
              Decline
            </Button>
          </div>
        </Row>
      </Row>
      <div className="break-word">
        <Title level={2}>{post?.title}</Title>
        <div className="pb-2">
          <Paragraph>{post?.content?.overview}</Paragraph>
          <Link to={`/post/${post._id}`} target="_blank">
            <Text className="clickable bold">Click here to read more</Text>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostRequests;
