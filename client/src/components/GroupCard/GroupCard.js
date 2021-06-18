import React from "react";
import { Button, Row, Col, Divider, Form, Typography, Input, Card } from "antd";
import { Avatar, Image, Tag, message } from "antd";
import styles from "./styles.js";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useMobile } from "../../utils/responsiveQuery.js";
import * as apiGroup from "../../api/group";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const { Title, Text } = Typography;

function GroupCard({ nameGroup, _id, description, totalMembers, status }) {
  const [txtButton, setTxtButton] = React.useState(status);
  const [user, setUser] = useLocalStorage("user");

  const isMobile = useMobile();

  const joinGroup = async () => {
    const { data } = await apiGroup.addPendingMemberGroup(
      _id,
      user?.result?._id
    );
  };

  const cancelJoinGroup = async () => {
    const { data } = await apiGroup.removePendingMember(_id, user?.result?._id);
  };

  const changeStateButton = async () => {
    if (txtButton === "Join") {
      await joinGroup();
      message.success(`You submited join request to ${nameGroup} group`);
      setTxtButton("Cancel Request");
    } else {
      await cancelJoinGroup();
      message.success(`You cancel join request to ${nameGroup} group`);
      setTxtButton("Join");
    }
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
            <Avatar
              size={72}
              src="https://i.pinimg.com/564x/03/d5/62/03d5624fae645eccaa74315f6ed49c03.jpg"
            />

            <div className="ml-3 break-word">
              <div className="break-word">
                <Link to={`/group/${_id}/main`}>
                  <Title style={styles.textUser}>
                    {nameGroup ?? "Name Group"}
                  </Title>
                </Link>
              </div>
              <div>
                <Text>{description ?? "Blackpink in your area"}</Text>
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
              <Text style={styles.text}>
                {" "}
                {(totalMembers ?? 0) +
                  " Member" +
                  (totalMembers > 2 ? "s" : "")}
              </Text>
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
