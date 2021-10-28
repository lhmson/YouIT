import React from "react";
import { Button, Avatar, Tag, Typography, message } from "antd";
import styles from "./styles.js";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import * as apiGroup from "../../api/group";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const { Text } = Typography;

function GroupJoinedCard({
  nameGroup,
  _id,
  description,
  topic,
  totalMembers,
  joined,
  update,
  setUpdate,
  backgroundUrl,
  isAdmin,
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
            className="col-10"
            style={{
              display: "flex",
              justifyContent: "center",
              minWidth: 500,
              // backgroundColor: "yellow",
            }}
          >
            <div style={{ width: 72, height: 72 }}>
              <Avatar size={72} src={backgroundUrl} />
            </div>

            <div className="mx-2" style={{ alignSelf: "center" }}>
              <div className="break-word">
                {isAdmin ? (
                  <Text style={styles.textUser}>
                    {nameGroup ?? "Name Group"}
                  </Text>
                ) : (
                  <Link to={`/group/${_id}/main`}>
                    <Text style={styles.textUser}>
                      {nameGroup ?? "Name Group"}
                    </Text>
                  </Link>
                )}
              </div>

              <div className="break-word">
                <Text>{description ?? "Information Technology Community"}</Text>
              </div>

              <div className="break-word">
                <Text strong>{`#${topic ?? "General"}`}</Text>
              </div>
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
            style={
              {
                // justifyContent: "flex-end",
                // alignItems: "flex-end",
              }
            }
          >
            {isAdmin ?? (
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
            )}
            <div>
              <Text style={styles.text}>
                {(totalMembers ?? 0) +
                  " Member" +
                  (totalMembers > 2 ? "s" : "")}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupJoinedCard;
