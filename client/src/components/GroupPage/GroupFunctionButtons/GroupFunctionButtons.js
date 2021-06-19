import { Button, message, Row, Select, Popover, Modal } from "antd";
import React, { useState, useEffect, useContext, useMemo } from "react";
import styles from "./styles.js";
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import { GroupContext } from "../../../pages/GroupPage/GroupPage";
import * as apiGroup from "../../../api/group";
import * as apiFriend from "../../../api/friend";

const { Option } = Select;

function GroupFunctionButtons() {
  const user = JSON.parse(localStorage.getItem("user"))?.result;
  const [visibleAdd, setVisibleAdd] = useState(false); // select display
  const [listFriends, setListFriends] = useState([]);
  const [usersToInvite, setUsersToInvite] = useState([]);
  const history = useHistory();
  const { group, setGroup } = useContext(GroupContext);
  const { confirm } = Modal;

  useEffect(() => {
    apiFriend.fetchListMyFriends(user?._id).then((res) => {
      setListFriends(
        res.data?.map((item, i) => ({ _id: item._id, name: item.name }))
      );
    });
  }, []);

  const handleChangeUserToInvite = (value, options) => {
    setUsersToInvite(options?.map((item) => item.key));
  };

  const handleVisibleChange = (visibleAdd) => {
    setVisibleAdd(visibleAdd);
  };

  const handleCreatePost = () => {
    history.push({
      pathname: "/post/create",
      state: { initialGroupId: group?._id },
    });
  };

  const handleInvite = (listInvitedFriends) => {
    apiGroup
      .inviteFriends(group?._id, listInvitedFriends)
      .then((res) => {
        message.success("Invitation sent!");
      })
      .catch((error) => message.success("pow" + error.message));
  };

  const handleDeleteGroup = (groupId) => {
    apiGroup
      .deleteGroup(groupId)
      .then((res) => {
        message.success("Group deleted successfully.");
        history.push(`/group/create`);
      })
      .catch((error) => message.success(error.message));
  };

  const isJoinedGroup = () => {
    let isJoined = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?._id) {
        isJoined = true;
      }
    });
    return isJoined;
  };

  const isFriendJoinedGroup = (id) => {
    let isJoined = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === id) {
        isJoined = true;
      }
    });
    return isJoined;
  };

  const isSentJoinRequest = () => {
    let isSent = false;
    group?.listPendingMembers.forEach((pendingMem) => {
      if (pendingMem?.userId === user?._id) {
        isSent = true;
      }
    });
    return isSent;
  };

  const joinGroup = async () => {
    const { data } = await apiGroup.addPendingMemberGroup(
      group?._id,
      user?._id
    );
    setGroup(data);
  };

  const cancelJoinRequest = async () => {
    const { data } = await apiGroup.removePendingMember(group?._id, user?._id);
    setGroup(data);
  };

  const isOwner = (user) => {
    let isOwner = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?._id) {
        if (member?.role !== "Member") isOwner = true;
      }
    });
    return isOwner;
  };

  const JoinGroupButton = () => {
    console.log(isSentJoinRequest());
    if (isSentJoinRequest()) {
      return (
        <Button
          className="green-button"
          style={(styles.button, { textAlign: "center" })}
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

  const listInvitedFriends = useMemo(
    () =>
      listFriends?.map((user, i) => {
        if (!isFriendJoinedGroup(user._id))
          return <Option key={user._id}>{user.name}</Option>;
      }),
    [listFriends]
  );

  const handleLeaveGroup = async (groupId, userId) => {
    apiGroup
      .leaveGroup(groupId, userId)
      .then((res) => {
        message.success("You have left the group.");
        history.push(`/feed`);
      })
      .catch((error) => message.success(error.message));
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure leave this group?",
      icon: <ExclamationCircleOutlined />,
      content: "If you leave this group, this group will be deleted ",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteGroup(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <div
        className="row mr-2"
        style={{
          // flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",

          // width: "50%",
        }}
      >
        {isJoinedGroup() ? (
          <div
            className="row"
            style={{
              // display: "flex",
              // flexDirection: "row",
              justifyContent: "flex-end",
              // width: "100%",
            }}
          >
            <Button
              className="green-button"
              style={styles.button}
              onClick={handleCreatePost}
            >
              Create Post
            </Button>
            <Popover
              content={
                <>
                  <Button onClick={() => handleInvite(usersToInvite)}>
                    OK
                  </Button>
                </>
              }
              title={
                <div>
                  <Select
                    mode="multiple"
                    placeholder="Invite friend"
                    value={usersToInvite}
                    onChange={handleChangeUserToInvite}
                    style={{ width: "100%" }}
                  >
                    {listInvitedFriends}
                  </Select>
                </div>
              }
              trigger="click"
              visible={visibleAdd}
              onVisibleChange={handleVisibleChange}
            >
              <Button
                style={styles.button}
                className="d-flex justify-content-center align-items-center green-button mr-3"
                icon={<PlusCircleOutlined />}
              >
                Invite
              </Button>
            </Popover>
            <Button
              className="green-button"
              style={styles.button}
              onClick={() => {
                isOwner(user)
                  ? showDeleteConfirm(group?._id)
                  : handleLeaveGroup(group?._id, user?._id);
              }}
            >
              Leave Group
            </Button>
            {isOwner(user) ? (
              <Button
                className="green-button"
                style={styles.button}
                onClick={() => {
                  handleDeleteGroup(group?._id);
                }}
              >
                Delete
              </Button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          JoinGroupButton()
        )}
      </div>
    </>
  );
}

export default GroupFunctionButtons;
