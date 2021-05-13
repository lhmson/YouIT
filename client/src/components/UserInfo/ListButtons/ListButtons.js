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
import { updateReceiver } from "../../../redux/actions/user";
import { updateListSendingFriendRequests } from "../../../api/user_info.js";

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

  const addFriend = async () => {
    // create friend request
    const friendRequest = {
      userConfirmId: user._id,
      userSendRequestId: loginUser._id,
    };
    const { data } = await createFriendRequest(friendRequest);
    //console.log(data._id);

    dispatch(updateReceiver(data));
    await updateListSendingFriendRequests(data);
  };

  const getMatchFriendRequest = async () => {
    const listFriendRequests = (await fetchAllFriendRequests()).data;

    const friendRequest = listFriendRequests.map((request) => {
      const listUserId = [request.userConfirmId, request.userSendRequestId];
      if (listUserId.includes(user?._id) && listUserId.includes(loginUser?._id))
        return request;
    });
    return friendRequest;

    // for (const request in listFriendRequests) {
    //   const listUserId = [request.userConfirmId, request.userSendRequestId];
    //   if (listUserId.includes(user?._id) && listUserId.includes(loginUser?._id))
    //     return request;
    // }
    // return null;
  };

  const cancelFriendRequest = (request) => {
    deleteFriendRequest(request?._id);
    // delete xong nho update lai list ... request o ca 2 user
  };

  const AddFriendButton = () => {
    if (!isMyProfile) {
      if (matchingFriendRequest) {
        if (loginUser?._id === matchingFriendRequest[0]?.userConfirmId) {
          //console.log("receiver");
          return (
            <Row style={{ marginTop: 16 }}>
              <Button className="green-button" style={{ marginLeft: 16 }}>
                Accept
              </Button>
              <Button style={{ marginLeft: 16 }}>Deny</Button>
            </Row>
          );
        } else if (
          loginUser?._id === matchingFriendRequest[0]?.userSendRequestId
        ) {
          //console.log("sender");
          return (
            <Button
              className="green-button"
              onClick={() => cancelFriendRequest(matchingFriendRequest[0])}
            >
              Cancel Request
            </Button>
          );
        }
      }
      // if not my profile and have no friend request, display add friend button
      //console.log("have no request");
      return (
        <Button className="green-button" onClick={addFriend}>
          Add friend
        </Button>
      );
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
            <Menu.Item key="post" icon={<MailOutlined />}>
              <Link to={`/userinfo/${user?._id}`} style={styles.linkView}>
                Post
              </Link>
            </Menu.Item>

            <Menu.Item key="about" icon={<MailOutlined />}>
              <Link to={`/userinfo/${user?._id}/about`} style={styles.linkView}>
                About
              </Link>
            </Menu.Item>
            <Menu.Item key="more" icon={<MailOutlined />}>
              <Link to="/wall" style={styles.linkView}>
                More
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
