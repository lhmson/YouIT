import React, { useEffect, useState } from "react";
import { Button, Menu, Row } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { Link, useLocation } from "react-router-dom";

import styles from "./styles.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoginUser } from "../../../utils/user.js";
import {
  createFriendRequest,
  deleteFriendRequest,
  fetchAllFriendRequests,
} from "../../../api/friendRequest";
import {
  addFriendRequest,
  removeFriendRequest,
} from "../../../redux/actions/user";
import {
  addFriend,
  addSendingFriendRequest,
  removeReceivingFriendRequest,
  removeSendingFriendRequest,
} from "../../../api/user_info.js";

const ListButtons = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loginUser = JSON.parse(localStorage.getItem("user"))?.result;
  const isMyProfile = isLoginUser(user);

  const location = useLocation();

  const getDefaultSelectedItem = () => {
    switch (location.pathname) {
      case `/userinfo/${user?._id}`:
        return "post";
      case `/userinfo/${user?._id}/about`:
        return "about";
      default:
        break;
    }
  };

  const defaultSelectedKey = getDefaultSelectedItem();

  const [selectedMenu, setSelectedMenu] = useState(defaultSelectedKey);
  const [matchingFriendRequest, setMatchingFriendRequest] = useState(null);

  useEffect(() => {
    setSelectedMenu(defaultSelectedKey);
  }, [defaultSelectedKey]);

  useEffect(async () => {
    setMatchingFriendRequest(await getMatchFriendRequest());
  }, [user]);

  const handleClick = (e) => {
    setSelectedMenu(e.key);
  };

  const handleAddingFriend = async () => {
    // create friend request
    const friendRequest = {
      userConfirmId: user._id,
      userSendRequestId: loginUser._id,
    };
    const { data } = await createFriendRequest(friendRequest);

    dispatch(addFriendRequest(data));
    await addSendingFriendRequest(data);
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

  const acceptFriendRequest = async () => {
    await addFriend(loginUser, user);

    if (matchingFriendRequest) {
      const request = matchingFriendRequest[0];
      await cancelFriendRequest(request);
    }
  };

  // xem lai ham nay, cach khac
  const getMatchFriendRequest = async () => {
    const listFriendRequests = (await fetchAllFriendRequests()).data;

    const friendRequest = listFriendRequests.map((request) => {
      const listUserId = [request.userConfirmId, request.userSendRequestId];
      if (listUserId.includes(user?._id) && listUserId.includes(loginUser?._id))
        return request;
    });
    return friendRequest;
  };

  const FriendButtons = () => {
    return (
      <Row>
        <Button style={{ marginLeft: 16 }}>Friends</Button>
        <Button className="green-button" style={{ marginLeft: 16 }}>
          Unfriend
        </Button>
      </Row>
    );
  };

  const AcceptDenyButtons = () => {
    const friendRequest = matchingFriendRequest[0];
    return (
      <Row style={{ marginTop: 16 }}>
        <Button
          className="green-button"
          style={{ marginLeft: 16 }}
          onClick={acceptFriendRequest}
        >
          Accept
        </Button>
        <Button
          style={{ marginLeft: 16 }}
          onClick={() => cancelFriendRequest(friendRequest)}
        >
          Deny
        </Button>
      </Row>
    );
  };
  // refactor this
  const AddFriendButton = () => {
    if (!isMyProfile) {
      var listFriends = Object.values(user?.listFriends ?? []);
      const isMyFriend = listFriends.includes(loginUser?._id);

      if (isMyFriend) {
        return <FriendButtons />;
      } else {
        if (matchingFriendRequest) {
          const friendRequest = matchingFriendRequest[0];
          if (loginUser?._id === friendRequest?.userConfirmId) {
            //console.log("receiver");
            return <AcceptDenyButtons />;
          } else if (loginUser?._id === friendRequest?.userSendRequestId) {
            return (
              <Button
                className="green-button"
                onClick={() => cancelFriendRequest(friendRequest)}
              >
                Cancel Request
              </Button>
            );
          }
        }
        // if not my profile and have no friend request, display add friend button
        //console.log("have no request");
        return (
          <Button className="green-button" onClick={handleAddingFriend}>
            Add friend
          </Button>
        );
      }
    }
    // if my profile, show nothing
    return <></>;
  };

  return (
    <>
      <Row
        style={{
          marginLeft: 16,
          marginRight: 32,
          marginTop: 32,
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginBottom: 32, maxWidth: "50vw" }}>
          <Menu
            onClick={handleClick}
            selectedKeys={[selectedMenu]}
            mode="horizontal"
          >
            <Menu.Item key="post">
              <Link to={`/userinfo/${user?._id}`} style={styles.linkView}>
                Post
              </Link>
            </Menu.Item>

            <Menu.Item key="about">
              <Link to={`/userinfo/${user?._id}/about`} style={styles.linkView}>
                About
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <AddFriendButton />
      </Row>
    </>
  );
};

export default ListButtons;
