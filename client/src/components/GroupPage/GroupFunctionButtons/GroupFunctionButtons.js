import { Button, message, Row, Select, Popover } from "antd";
import React, { useState, useEffect, useContext, useMemo } from "react";
import styles from "./styles.js";
import { PlusCircleOutlined } from "@ant-design/icons";

import { useHistory } from "react-router";
import { GroupContext } from "../../../pages/GroupPage/GroupPage";

import * as apiGroup from "../../../api/group";
import * as apiFriend from "../../../api/friend";
import { GiConsoleController } from "react-icons/gi";

const { Option } = Select;

function GroupFunctionButtons() {
  const user = JSON.parse(localStorage.getItem("user"))?.result;

  const [visibleAdd, setVisibleAdd] = useState(false); // select display

  const [listFriends, setListFriends] = useState([]);

  const [usersToInvite, setUsersToInvite] = useState([]);

  const history = useHistory();
  const { group, setGroup } = useContext(GroupContext);

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

  const handleInvite = () => {
    // chỗ này làm cái noti gửi link group qua cho cái {listYourFriend} giúp t
  };

  const handleDeleteGroup = (id) => {
    apiGroup
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

  const isFriendJoinedGroup = (id) => {
    let isJoined = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId == id) {
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
          type="primary"
          style={styles.button}
          onClick={cancelJoinRequest}
        >
          Cancel Request
        </Button>
      );
    }

    return (
      <Button type="primary" style={styles.button} onClick={joinGroup}>
        Join Group
      </Button>
    );
  };

  const listYourFriend = useMemo(
    () =>
      listFriends?.map((user, i) => {
        if (!isFriendJoinedGroup(user._id))
          return <Option key={user._id}>{user.name}</Option>;
      }),
    [listFriends]
  );

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
            <Button type="primary" style={styles.button}>
              Create Post
            </Button>
            {/* <Button type="primary" style={styles.button}>
              Invite
            </Button> */}

            <Popover
              content={
                <>
                  <Button onClick={() => handleInvite()}>OK</Button>
                </>
              }
              title={
                <div>
                  <Select
                    mode="tags"
                    placeholder="Invite friend"
                    value={usersToInvite}
                    onChange={handleChangeUserToInvite}
                    style={{ width: "100%" }}
                  >
                    {listYourFriend}
                  </Select>
                </div>
              }
              trigger="click"
              visible={visibleAdd}
              onVisibleChange={handleVisibleChange}
            >
              <Button
                className="d-flex justify-content-center align-items-center green-button mr-3"
                icon={<PlusCircleOutlined />}
              >
                Invite
              </Button>
            </Popover>

            {isOwner(user) ? (
              <Button
                type="primary"
                style={styles.button}
                onClick={() => {
                  handleDeleteGroup(group?._id);
                }}
              >
                Delete
              </Button>
            ) : (
              ""
            )}
          </div>
        ) : (
          JoinGroupButton()
        )}
      </Row>
    </>
  );
}

export default GroupFunctionButtons;
