import React, { useEffect, useState } from "react";
import { Button, Menu, Row } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { Link, useLocation } from "react-router-dom";

import styles from "./styles.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoginUser } from "../../../utils/user.js";
import { createFriendRequest } from "../../../api/friendRequest";
import { updateUser } from "../../../redux/actions/user";
import {
  updateListReceivingFriendRequests,
  updateListSendingFriendRequests,
  updateUserInfo,
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

  useEffect(() => {
    setSelectedMenu(defaultSelectedKey);
  }, [defaultSelectedKey]);

  const handleClick = (e) => {
    setSelectedMenu(e.key);
  };

  const updateReceiver = (friendRequestId) => {
    // update listReceivingRequest in user
    // user receives a friend request
    const updatedUser = {
      ...user,
      listReceivingFriendRequests: [
        ...user.listReceivingFriendRequests,
        friendRequestId,
      ],
    };
    //console.log(updatedUser);
    dispatch(updateUser(updatedUser));
  };

  const updateSender = (friendRequestId) => {
    const newListSendingFriendRequests =
      loginUser.listSendingFriendRequests.push(friendRequestId);
    console.log(loginUser.listSendingFriendRequests);
    const updatedUser = {
      ...loginUser,
      newListSendingFriendRequests,
    };
    console.log(updatedUser);
    const { data } = updateUserInfo(updatedUser);
    console.log(data);
  };

  const addFriend = async () => {
    // create friend request
    const friendRequest = {
      userConfirmId: user._id,
      userSendRequestId: loginUser._id,
    };
    const { data } = await createFriendRequest(friendRequest);
    //console.log(data._id);

    updateListReceivingFriendRequests(data);
    updateListSendingFriendRequests(data);

    //updateReceiver(data._id);
    //updateSender(data._id);
  };

  const AddFriendButton = () => {
    if (!isMyProfile) {
      return (
        <Button className="green-button" onClick={addFriend}>
          Add friend
        </Button>
      );
    }
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
