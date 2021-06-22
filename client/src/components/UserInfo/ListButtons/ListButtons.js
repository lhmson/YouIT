import React, { useEffect, useState } from "react";
import { Button, Menu, message, Row, Modal, Input } from "antd";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../Loading/Loading";

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
  followUser,
  removeFriendRequest,
  unfollowUser,
  unfriend,
} from "../../../redux/actions/user";
import {
  addFriend,
  addSendingFriendRequest,
  removeReceivingFriendRequest,
  removeSendingFriendRequest,
} from "../../../api/user_info.js";

import { createReport } from "../../../api/report.js";

const { TextArea } = Input;

const ListButtons = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loginUser = JSON.parse(localStorage.getItem("user"))?.result;
  const isMyProfile = isLoginUser(user);
  const [isModalReport, setIsModalReport] = useState(false);
  const [contentReport, setContentReport] = useState("");
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [loadingFollow, setLoadingFollow] = useState(false);

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

  useEffect(() => {
    async function act() {
      setMatchingFriendRequest(await getMatchFriendRequest());
      setLoading(false);
      setLoadingFollow(false);
    }
    act();
  }, [user]);

  const handleClick = (e) => {
    setSelectedMenu(e.key);
  };

  const handleAddingFriend = async () => {
    setLoading(true);
    setLoadingFollow(true);
    // create friend request
    const friendRequest = {
      userConfirmId: user._id,
      userSendRequestId: loginUser._id,
    };
    await createFriendRequest(friendRequest).then(async (res) => {
      if (res.status === 403) {
        setLoading(false);
        setLoadingFollow(false);
      } else {
        dispatch(addFriendRequest(res.data));
        await addSendingFriendRequest(res.data);

        dispatch(followUser(user?._id));
      }
    });
  };

  const cancelFriendRequest = async (request) => {
    // const { status } = await deleteFriendRequest(request?._id);
    // console.log(status);
    setLoading(true);
    setLoadingFollow(true);

    await deleteFriendRequest(request?._id)
      .then(async (res) => {
        if (user?._id === request?.userConfirmId) {
          await removeSendingFriendRequest(request);
        } else if (user?._id === request?.userSendRequestId) {
          await removeReceivingFriendRequest(request);
        }
        dispatch(removeFriendRequest(request, user));
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          // cho nay de confirm hay reload trang gi do
          setLoading(false);
          setLoadingFollow(false);
        }
      });
  };

  const acceptFriendRequest = async () => {
    setLoading(true);
    setLoadingFollow(true);

    if (matchingFriendRequest) {
      const request = matchingFriendRequest[0];

      await addFriend(request);
      dispatch(followUser(user?._id));

      await cancelFriendRequest(request);
    }
  };

  const handleUnfriend = () => {
    setLoading(true);
    setLoadingFollow(true);
    dispatch(unfriend(loginUser?._id, user?._id));
    dispatch(unfollowUser(user?._id));
  };

  // xem lai ham nay, cach khac
  const getMatchFriendRequest = async () => {
    const listFriendRequests = (await fetchAllFriendRequests()).data;

    const friendRequest = listFriendRequests.filter((request) => {
      const listUserId = [request.userConfirmId, request.userSendRequestId];
      if (listUserId.includes(user?._id) && listUserId.includes(loginUser?._id))
        return request;
    });

    return friendRequest;
  };

  const handleFollowUser = () => {
    setLoadingFollow(true);
    dispatch(followUser(user?._id));
  };

  const handleUnfollowUser = () => {
    setLoadingFollow(true);
    dispatch(unfollowUser(user?._id));
  };

  const FriendButtons = () => {
    return (
      <Row>
        <Button
          className="green-button"
          style={styles.button}
          onClick={handleUnfriend}
          loading={loading}
        >
          {loading ? "Loading" : "Unfriend"}
        </Button>
      </Row>
    );
  };

  const AcceptDenyButtons = () => {
    const friendRequest = matchingFriendRequest[0];
    // console.log(friendRequest);
    return (
      <Row>
        <Button
          className="green-button"
          style={styles.button}
          onClick={acceptFriendRequest}
          loading={loading}
        >
          {loading ? "Loading" : "Accept"}
        </Button>
        <Button
          style={styles.button}
          onClick={() => cancelFriendRequest(friendRequest)}
          loading={loading}
        >
          {loading ? "Loading" : "Deny"}
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
        // console.log(matchingFriendRequest);
        if (matchingFriendRequest) {
          const friendRequest = matchingFriendRequest[0];
          if (loginUser?._id === friendRequest?.userConfirmId) {
            //console.log("receiver");
            return <AcceptDenyButtons />;
          } else if (loginUser?._id === friendRequest?.userSendRequestId) {
            return (
              <Button
                className="green-button"
                style={styles.button}
                onClick={() => cancelFriendRequest(friendRequest)}
                loading={loading}
              >
                {loading ? "Loading" : "Cancel Request"}
              </Button>
            );
          }
        }
        // if not my profile and have no friend request, display add friend button
        //console.log("have no request");
        return (
          <Button
            className="green-button"
            style={styles.button}
            onClick={handleAddingFriend}
            loading={loading}
          >
            {loading ? "Loading" : "Add friend"}
          </Button>
        );
      }
    }
    // if my profile, show nothing
    return <></>;
  };

  const FollowButton = () => {
    if (!isMyProfile) {
      // check if login user followed this user
      const listFollowingFriends = user?.listFriendFollows ?? [];
      const isFollowed = listFollowingFriends.includes(loginUser?._id);

      if (isFollowed) {
        return (
          <Button
            className="green-button"
            style={styles.button}
            onClick={handleUnfollowUser}
            loading={loadingFollow}
          >
            {loadingFollow ? "Loading" : "Unfollow"}
          </Button>
        );
      }
      return (
        <Button
          className="green-button"
          style={styles.button}
          onClick={handleFollowUser}
          loading={loadingFollow}
        >
          {loadingFollow ? "Loading" : "Follow"}
        </Button>
      );
    }
    return <></>;
  };

  const ReportButton = () => {
    if (!isMyProfile) {
      return (
        <Button
          className="green-button"
          style={{ ...styles.button, backgroundColor: "red", color: "white" }}
          onClick={() => {
            setIsModalReport(true);
            console.log("hello");
          }}
        >
          Report
        </Button>
      );
    }
    return <></>;
  };

  const ModalReport = () => {
    let contentReport = "";
    const reportUser = async () => {
      setIsModalReport(false);
      setContentReport("");
      const report = {
        userReportId: loginUser._id,
        itemId: user._id,
        content: contentReport,
        status: "pending",
        kind: "user",
      };
      message.success("This user was reported by you successfully");
      await createReport(report);
    };
    return (
      <Modal
        title="Why do you think this user should be reported?"
        visible={isModalReport}
        onOk={async () => {
          await reportUser();
        }}
        onCancel={() => {
          setIsModalReport(false);
        }}
      >
        <TextArea
          style={{ height: 200 }}
          onChange={(e) => {
            contentReport = e.target.value;
          }}
          // value={contentReport}
          autoSize={{ minRows: 3, maxRows: 15 }}
        />
      </Modal>
    );
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
        <ModalReport></ModalReport>
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
        <Row style={{ marginTop: 16 }}>
          <AddFriendButton />
          {FollowButton()}
          <ReportButton></ReportButton>
        </Row>
      </Row>
    </>
  );
};

export default ListButtons;
