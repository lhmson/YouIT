import React from "react";
import { Button, Row, Col, Divider, Form, Typography, Input, Card } from "antd";
import { Avatar, Image, Tag } from "antd";
import styles from "./styles.js";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useMobile } from "../../utils/responsiveQuery.js";

const { Title, Text } = Typography;

function GroupCard({ nameGroup, _id }) {
  const [txtButton, setTxtButton] = React.useState("Join");

  const isMobile = useMobile();

  const changeStateButton = () => {
    if (txtButton === "Join") setTxtButton("Cancel Request");
    else setTxtButton("Join");
  };

  return (
    <>
      <div style={styles.card}>
        <div
          className={`${!isMobile && "row"} m-2`}
          style={{ justifyContent: "space-between" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // minWidth: 600,
            }}
          >
            <div>
              <Avatar
                size={72}
                src="https://vtv1.mediacdn.vn/thumb_w/650/2020/10/20/blackpink-lisa-mac-160316252527410005928.jpg"
              />
            </div>

            <div className="ml-3 break-word">
              <div className="break-word">
                <Link to={`/group/${_id}`}>
                  <Title style={styles.textUser}>
                    {nameGroup ?? "Name Group"}
                  </Title>
                </Link>
              </div>
              <div>
                <Text>"Blackpink in your area"</Text>
              </div>
            </div>
          </div>

          <div
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              onClick={changeStateButton}
              className="mb-2"
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
              }}
            >
              {txtButton}
            </Button>
            <div>
              <Text style={styles.text}>12,8K Members</Text>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="ml-4">
            <Tag className="tag">#Talkshow</Tag>
            <Tag className="tag">#KPOP</Tag>
            <Tag className="tag">#Film</Tag>
            <Text style={{ ...styles.text, fontWeight: 600 }}>+ 15 Posts</Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupCard;
