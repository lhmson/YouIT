import React from "react";
import { Button, Avatar, Tag, Typography, message } from "antd";
import styles from "./styles.js";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import * as apiGroup from "../../api/group";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const { Text } = Typography;

function GroupJoinedCard({
  nameGroup,
  _id,
  description,
  totalMembers,
  joined,
  update,
  setUpdate,
}) {
  const [user, setUser] = useLocalStorage("user");
  const history = useHistory();
  const txtButton = joined ? "Post" : "Cancel request";
  const onPressButton = async () => {
    if (joined) {
      // don't if the text. Always trust just 1 source of truth. Also what if you have to support other languages?
      history.push({
        pathname: "/post/create",
        state: { initialGroupId: _id },
      });
    } else {
      await cancelJoinGroup();
    }
  };
  const cancelJoinGroup = async () => {
    const { data } = await apiGroup.removePendingMember(_id, user?.result?._id);
    message.success(`You cancel join request to ${nameGroup} successfully`);
    setUpdate(!update);
  };
  return (
    <>
      <div style={styles.card}>
        <div className="row ml-2" style={{ justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minWidth: 500,
            }}
          >
            <Avatar
              size={72}
              src="https://i.pinimg.com/564x/03/d5/62/03d5624fae645eccaa74315f6ed49c03.jpg"
            />

            <div className="col-8" style={{ alignSelf: "center" }}>
              <Link to={`/group/${_id}/main`}>
                <Text style={styles.textUser}>{nameGroup ?? "Name Group"}</Text>
              </Link>
              <div style={{ marginTop: 0 }}></div>
              <Text>{description ?? "Blackpink in your area"}</Text>
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
            className="mr-3"
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              onClick={onPressButton}
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

export default GroupJoinedCard;
