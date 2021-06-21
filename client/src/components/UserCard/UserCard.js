import React, { useState, useEffect } from "react";
import { Button, Typography, List } from "antd";
import { Avatar, Tag, Popover, message } from "antd";
import styles from "./styles.js";
import { Link } from "react-router-dom";
import * as api from "../../api/friend";
import { checkUserASendedUserB } from "../../api/friendRequest";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  createFriendRequest,
  deleteFriendRequest,
  fetchAllFriendRequests,
} from "../../api/friendRequest";
import {
  addFriendRequest,
  removeFriendRequest,
} from "../../redux/actions/user";
import {
  addFriend,
  addSendingFriendRequest,
  removeReceivingFriendRequest,
  removeSendingFriendRequest,
} from "../../api/user_info.js";

import { useDispatch } from "react-redux";
import { useMobile } from "../../utils/responsiveQuery.js";

const { Title, Text } = Typography;

function UserCard(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useLocalStorage("user");
  const { name } = props;
  const { _id } = props;
  const { avatarUrl } = props;
  const [numberMutual, setNumberMutual] = useState(0);
  const [txtButton, setTxtButton] = useState(
    props.relationship ?? "Add Friend"
  );
  const [listMutual, setListMutual] = useState([]);

  const isMobile = useMobile();

  const handleAddingFriend = async (confirmId, senderId) => {
    // create friend request
    const friendRequest = {
      userConfirmId: confirmId,
      userSendRequestId: senderId,
    };
    const { data } = await createFriendRequest(friendRequest);

    dispatch(addFriendRequest(data));
    await addSendingFriendRequest(data);
  };
  // xem lai ham nay, cach khac
  const getMatchFriendRequest = async () => {
    const listFriendRequests = (await fetchAllFriendRequests()).data;

    const friendRequest = listFriendRequests.map((request) => {
      const listUserId = [request.userConfirmId, request.userSendRequestId];
      if (listUserId.includes(_id) && listUserId.includes(user?.result?._id))
        return request;
    });
    console.log("friend req", friendRequest[0]);
    return friendRequest[0];
  };

  const cancelFriendRequest = async (request) => {
    deleteFriendRequest(request?._id);

    if (user?._id === request?.userConfirmId) {
      await removeSendingFriendRequest(request);
    } else if (user?._id === request?.userSendRequestId) {
      await removeReceivingFriendRequest(request);
    }
    dispatch(removeFriendRequest(request, user));
  };

  const changeStateButton = async () => {
    const key = "updatable";
    if (txtButton === "Add Friend") {
      const openMessage = () => {
        message.loading({ content: "Sending request...", key });
        setTimeout(() => {
          message.success({
            content: "You sended request successfully!",
            key,
            duration: 2,
          });
        }, 3000);
      };
      openMessage();
      await handleAddingFriend(_id, user?.result?._id);
      setTxtButton("Cancel Request");
    } else if (txtButton === "Cancel Request") {
      const openMessage = () => {
        message.loading({ content: "Sending request...", key });
        setTimeout(() => {
          message.success({
            content: "You cancel request successfully!",
            key,
            duration: 2,
          });
        }, 3000);
      };
      openMessage();
      await cancelFriendRequest(await getMatchFriendRequest());
      setTxtButton("Add Friend");
    } else if (txtButton === "Waiting you accept") {
      message.info("You can go to the user profile to accept or deny");
    }
  };

  useEffect(() => {
    api
      .fetchCountMutualFriends(user?.result?._id, _id)
      .then((res) => {
        if (res.data) setNumberMutual(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    api
      .checkFriends(user?.result?._id, _id)
      .then((res) => {
        if (res.data) setTxtButton("Friends");
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    api
      .fetchListMutualFriends(user?.result?._id, _id)
      .then((res) => {
        if (res.data && res.data instanceof Array) {
          const tempList = [];
          for (let i = 0; i < res.data.length; i++)
            tempList.push({ name: res.data[i].name, id: res.data[i]._id });
          setListMutual(tempList);
          console.log(tempList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    checkUserASendedUserB(user?.result?._id, _id)
      .then((res) => {
        if (res.data) setTxtButton("Cancel Request");
      })
      .catch((e) => {
        console.log(e);
      });

    checkUserASendedUserB(_id, user?.result?._id)
      .then((res) => {
        if (res.data) setTxtButton("Waiting you accept");
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const popupListMutualFriend = (data) => {
    return (
      <>
        <div>
          <List
            header={<div></div>}
            footer={<div></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Link to={`/userinfo/${item.id}`}>
                  <Text style={styles.text}>{item.name}</Text>
                </Link>
              </List.Item>
            )}
          />
        </div>
      </>
    );
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
              <Avatar size={72} src={avatarUrl} />
            </div>

            <div className="ml-3 break-word">
              <Link to={`/userinfo/${_id}`}>
                <Title style={styles.textUser}>{name ?? "Anonymous"}</Title>
              </Link>

              <Text>React Native Developer</Text>
            </div>
          </div>

          <div
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              display: user?.result?._id === _id ? "none" : "block",
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
              <Popover
                placement="bottom"
                title={""}
                content={popupListMutualFriend(listMutual ?? [])}
                trigger="hover"
              >
                <Text style={styles.text}>
                  {numberMutual} mutual friend{numberMutual >= 2 ? "s" : ""}
                </Text>
              </Popover>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="ml-4">
            <Tag className="tag">C#</Tag>
            <Tag className="tag">Javascript</Tag>
            <Tag className="tag">Unity 3D</Tag>
            <Text style={{ ...styles.text, fontWeight: 600 }}>+ 15 Posts</Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
