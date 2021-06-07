import { Button, message, Row } from "antd";
import React, { useContext } from "react";
import styles from "./styles.js";
import * as api from "../../../api/group";
import { useHistory } from "react-router";
import { GroupContext } from "../../../pages/GroupPage/GroupPage";

function GroupFunctionButtons() {
  const user = JSON.parse(localStorage.getItem("user"))?.result;

  const history = useHistory();
  const { group, setGroup } = useContext(GroupContext);

  const handleDeleteGroup = (id) => {
    api
      .deleteGroup(id)
      .then((res) => {
        message.success(res.data.message);
        history.push(`/group/create`);
      })
      .catch((error) => message.success(error.message));
  };

  const isJoinedGroup = () => {
    let isJoined = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId == user?._id) {
        isJoined = true;
      }
    });
    return isJoined;
  };

  const isSentJoinRequest = () => {
    let isSent = false;
    group?.listPendingMembers.forEach((pendingMem) => {
      if (pendingMem?.userId == user?._id) {
        isSent = true;
      }
    });
    return isSent;
  };

  const joinGroup = async () => {
    const { data } = await api.addPendingMemberGroup(group?._id, user?._id);
    setGroup(data);
  };

  const cancelJoinRequest = async () => {
    const { data } = await api.removePendingMember(group?._id, user?._id);
    setGroup(data);
  };

  const JoinGroupButton = () => {
    console.log(isSentJoinRequest());
    if (isSentJoinRequest()) {
      return (
        <Button
          className="green-button"
          style={styles.button}
          onClick={cancelJoinRequest}
        >
          Cancel Request
        </Button>
      );
    }
    return (
      <Button
        className="green-button"
        style={styles.button}
        onClick={joinGroup}
      >
        Join Group
      </Button>
    );
  };

  return (
    <>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "50%",
        }}
      >
        {isJoinedGroup() ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button className="green-button" style={styles.button}>
              Create Post
            </Button>
            <Button className="green-button" style={styles.button}>
              Invite
            </Button>
            <Button
              className="green-button"
              style={styles.button}
              onClick={() => {
                handleDeleteGroup(group?._id);
              }}
            >
              Delete
            </Button>
          </div>
        ) : (
          JoinGroupButton()
        )}
      </Row>
    </>
  );
}

export default GroupFunctionButtons;
