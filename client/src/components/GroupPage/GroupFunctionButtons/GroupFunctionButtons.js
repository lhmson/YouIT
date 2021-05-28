import { Button, message, Row } from "antd";
import React, { useContext } from "react";
import styles from "./styles.js";
import * as api from "../../../api/group";
import { addGroupPendingMember } from "../../../api/groupPendingMember";
import { useHistory } from "react-router";
import { GroupContext } from "../../../pages/GroupPage/GroupPage";

function GroupFunctionButtons() {
  const user = JSON.parse(localStorage.getItem("user"))?.result;

  const history = useHistory();
  const { group } = useContext(GroupContext);

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
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?._id) {
        return true;
      }
    });
    return false;
  };

  const handleJoinGroup = () => {
    const pendingMember = {
      groupId: group?._id,
      userId: user?._id,
    };
    addGroupPendingMember(pendingMember);
  };

  const JoinGroupButton = () => {
    return (
      <Button type="primary" style={styles.button} onClick={handleJoinGroup}>
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
          <div>
            <Button type="primary" style={styles.button}>
              Create Post
            </Button>
            <Button type="primary" style={styles.button}>
              Invite
            </Button>
            <Button
              type="primary"
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
