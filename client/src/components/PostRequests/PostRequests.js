import React from "react";
import { Button, Typography, Avatar, Tag, message } from "antd";
import { Link } from "react-router-dom";
import styles from "./styles.js";
import * as api from "../../api/post";

const { Title, Text, Paragraph } = Typography;

function PostRequests(props) {
  const { nameOwner } = props;
  const { content } = props;
  const { _idOwnerPost } = props;
  const { _id } = props;

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
    <>
      <div style={styles.card}>
        <div className="row">
          <div
            className="col-6"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              size={72}
              src="https://vtv1.mediacdn.vn/thumb_w/650/2020/10/20/blackpink-lisa-mac-160316252527410005928.jpg"
            />

            <div className="col-9" style={{ alignSelf: "center" }}>
              <Link to={`/userinfo/${_idOwnerPost}`}>
                <Text style={styles.textUser}>
                  {nameOwner ?? "Lalisa Manobal"}
                </Text>
              </Link>
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
            className="col-2"
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Button
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
                width: 120,
              }}
              onClick={() => acceptPostRequest(_id)}
            >
              Accept
            </Button>
          </div>

          <div
            className="col-2"
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Button
              type="ghost"
              style={{
                background: "#BDBDBD",
                borderColor: "#BDBDBD",
                color: "black",
                fontWeight: 500,
                width: 120,
              }}
              onClick={() => removePostRequest(_id)}
            >
              Decline
            </Button>
          </div>
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          <div className="col-10">
            <Tag style={styles.tag}>C#</Tag>
            <Tag style={styles.tag}>Javascript</Tag>
            <Tag style={styles.tag}>Unity 3D</Tag>
          </div>
        </div>

        <div className="row" style={{ padding: 16 }}>
          <Paragraph>
            {content ?? " ................................................."}
          </Paragraph>
          {/* <Link href="#" target="_blank" strong style={{ color: COLOR.green }}>
            Xem toàn bộ bài viết
          </Link> */}
        </div>
      </div>
    </>
  );
}

export default PostRequests;
