import React, { useState, useEffect, useMemo } from "react";
import { Button, Typography, List, message } from "antd";
import { Avatar, Tag, Popover, Tooltip } from "antd";
import styles from "../UserCard/styles.js";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as api from "../../api/friend";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  deleteFriendRequest,
  fetchAllFriendRequests,
} from "../../api/friendRequest";
import {
  removeFriendRequest,
} from "../../redux/actions/user";
import {
  addFriend,
  removeReceivingFriendRequest,
  removeSendingFriendRequest,
} from "../../api/user_info.js";
import { fetchProgrammingHashtags } from "../../api/hashtag";
import { useDispatch } from "react-redux";

const {Text } = Typography;

function UserRequestCard(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useLocalStorage("user");
  const { name } = props;
  const { _id } = props;
  const { avatarUrl } = props;
  const { updateData, setUpdateData } = props;
  const [numberMutual, setNumberMutual] = useState(0);
  const [listMutual, setListMutual] = useState([]);
  const [matchingFriendRequest, setMatchingFriendRequest] = useState(null);
  const [listHashTags, setListHashTags] = useState([]);

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

    if (user?.result._id === request?.userConfirmId) {
      await removeSendingFriendRequest(request);
    } else if (user?.result._id === request?.userSendRequestId) {
      await removeReceivingFriendRequest(request);
    }
    dispatch(removeFriendRequest(request, user?.result));
  };

  const acceptFriendRequest = async () => {
    await addFriend(user?.result, { _id: _id });

    if (matchingFriendRequest) {
      const request = matchingFriendRequest;
      await cancelFriendRequest(request);
    }
    message.success("Now, we are good friends");
    setUpdateData(!updateData);
  };

  const denyFriendRequest = async () => {
    if (matchingFriendRequest) {
      const request = matchingFriendRequest;
      await cancelFriendRequest(request);
    }
    message.success("You deny this request successfully");
    setUpdateData(!updateData);
  };

  useEffect(() => {
    async function act() {
      setMatchingFriendRequest(await getMatchFriendRequest());
    }
    act();
  }, [user]);

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
    fetchProgrammingHashtags(_id)
      .then((res) => {
        if (res.data) setListHashTags(res.data);
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
        <div className="row ml-2" style={{ justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minWidth : 600,
            }}
          >
            <Avatar
              size={72}
              src={avatarUrl}
            />

            <div className="col-8" style={{ alignSelf: "center" }}>
              <Link to={`/userinfo/${_id}`}>
                <Text style={styles.textUser}>{name ?? "Lalisa Manobal"}</Text>
              </Link>
              <div style={{ marginTop: 0 }}></div>
              <Text>React Native Developer</Text>
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
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              display: user?.result?._id === _id ? "none" : "block",
            }}
          >
            <Button
              onClick={acceptFriendRequest}
              className="mb-2"
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
                marginRight: 8,
              }}
            >
              Accept
            </Button>

            <Button
              onClick={denyFriendRequest}
              className="mb-2"
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
              }}
            >
              Deny
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
            {listHashTags?.map((item, i) => (
              <Tooltip
                title={`Mentioned ${item?.count} time${
                  item?.count > 1 ? "s" : ""
                }`}
              >
                <Tag key={i} className="mb-2 tag">
                  {item.name}
                </Tag>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRequestCard;
