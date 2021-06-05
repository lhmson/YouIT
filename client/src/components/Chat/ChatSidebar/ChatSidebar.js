import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  Button,
  Drawer,
  Typography,
  Badge,
  Modal,
  Tooltip,
  Select,
  Popover,
  message,
} from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import styles from "../styles.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import moment from "moment";
import { Link } from "react-router-dom";
import "../styles.css";
import COLOR from "../../../constants/colors.js";
import { useMobile } from "../../../utils/responsiveQuery.js";

import * as apiFriend from "../../../api/friend";
import * as apiConversation from "../../../api/conversation";
import { useMessage } from "../../../hooks/useMessage.js";
import { useFriendsStatus } from "../../../context/FriendsStatusContext.js";
import { renderStatus } from "../../../utils/userStatus.js";

const { Title } = Typography;

const { Option } = Select;

function ChatSidebar({
  isOpen,
  setIsOpen,
  currentId,
  listConversations,
  updateListConversations,
  addConversation,
  updateCurrentId,
  // isAddConversation,
  // setIsAdd,
}) {
  const isMobile = useMobile();

  const [user] = useLocalStorage("user");

  const searchInputRef = useRef();

  const titleRef = useRef();

  const [visibleAdd, setVisibleAdd] = useState(false); // select display

  const [listFriends, setListFriends] = useState([]);

  const [usersToAdd, setUsersToAdd] = useState([]);

  const [listUnseenConversations, setListUnseenConversations] = useState([]);

  const messageHandle = useMessage();

  const friendsStatusManager = useFriendsStatus();

  // const [listConversations, setListConversations] = useState([]);

  // const conversations = useConversations();

  useEffect(() => {
    apiFriend.fetchListMyFriends(user?.result?._id).then((res) => {
      setListFriends(
        res.data?.map((item, i) => ({ _id: item._id, name: item.name }))
      );
    });
  }, []);

  // useEffect(() => {
  //   apiConversation.fetchConversationsOfUser().then((res) => {
  //     updateListConversations(res.data);
  //     // console.log("update list", res.data);
  //   });
  // }, []);

  const handleFetchListUnseenConversations = () => {
    apiConversation
      .fetchUnseenConversationId()
      .then((res) => setListUnseenConversations(res.data));

    apiConversation.fetchConversationsOfUser().then((res) => {
      updateListConversations(res.data);
      // console.log("update list", res.data);
    });
  };

  useEffect(() => {
    messageHandle.onReceive((msg) => {
      handleFetchListUnseenConversations();
    });

    messageHandle.onSeen((msg) => {
      handleFetchListUnseenConversations();
    });

    handleFetchListUnseenConversations();

    return messageHandle.cleanUpAll;
  }, []);

  // useEffect(() => {
  //   apiConversation.fetchConversationsOfUser().then((res) => {
  //     setListConversations(res.data);
  //   });
  //   // setIsAdd(false);
  // }, []);
  // need real time update there

  const handleSearch = () => {};

  const handleChangeUserToAdd = (value, options) => {
    // console.log("opt", options);
    // console.log(`selected ${value}`);
    setUsersToAdd(options?.map((item) => item.key));
  };

  const handleAddConversation = () => {
    if (usersToAdd.length > 0) {
      apiConversation
        .createConversation({
          listMembers: usersToAdd,
          title: titleRef.current.state.value,
        })
        .then((res) => {
          addConversation(res.data);
          updateCurrentId(res.data._id);
        });
      // setIsAdd(true);
    } else {
      message.error("Enter some user to setup");
    }
    setVisibleAdd(false);
  };

  const handleVisibleChange = (visibleAdd) => {
    setVisibleAdd(visibleAdd);
  };

  const renderAvatar = (item) => {
    if (item.listMembers.length <= 2) {
      return (
        item.avatar ??
        "https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
      );
    } else {
      return "https://cdn.iconscout.com/icon/free/png-256/group-1543545-1306001.png";
    }
  };

  const getConversationStatus = (conversation) => {
    let result = "offline";
    conversation?.listMembers?.forEach((item) => {
      if (item._id !== user?.result?._id) {
        const status = friendsStatusManager.getStatus(item._id);
        if (status === "online") {
          result = "online";
        } else if (status === "busy" && result !== "online") {
          result = "busy";
        }
      }
    });
    return result;
  };

  const Header = () => {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <Title>Messages</Title>

          <Popover
            content={
              <>
                <Button onClick={() => handleAddConversation()}>Create</Button>
              </>
            }
            title={
              <div>
                <Input
                  type="text"
                  placeholder="Title"
                  ref={titleRef}
                  // onChange={(e) => handleChangeTitle(e)}
                  style={{ margin: "5px 0" }}
                />
                <Select
                  mode="tags"
                  placeholder="Add friend"
                  value={usersToAdd}
                  onChange={handleChangeUserToAdd}
                  style={{ width: "100%" }}
                >
                  {listFriends?.map((item) => (
                    <Option key={item._id}>{item.name}</Option>
                  ))}
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
              Add
            </Button>
          </Popover>
        </div>

        <div className="search-container">
          <Input
            onPressEnter={() => handleSearch()}
            allowClear
            suffix={
              <SearchOutlined
                onClick={() => handleSearch()}
                style={{ fontSize: 24, color: COLOR.black }}
              />
            }
            ref={searchInputRef}
            bordered={false}
            style={styles.input}
            placeholder="Search"
            defaultValue={""}
          />
        </div>
      </div>
    );
  };

  return (
    <Drawer
      title={Header()}
      placement="left"
      width={isMobile ? "80%" : "50%"}
      // closable={false}
      // onClick={() => setDrawerVisible(false)}
      closable={false}
      onClose={() => setIsOpen(false)}
      visible={isOpen}
    >
      {isOpen && (
        <>
          <div className="conversation-list">
            {currentId &&
            listConversations &&
            listConversations.length !== 0 ? (
              listConversations.map((item, i) => (
                <div key={item?._id} onClick={() => updateCurrentId(item?._id)}>
                  <div
                    className={`conversation ${
                      item?._id === currentId && "active"
                    }`}
                  >
                    <Badge
                      dot
                      color={renderStatus(getConversationStatus(item))}
                    >
                      <img src={renderAvatar(item)} alt={item?._id} />
                    </Badge>
                    <div className="title-text">{item?.title}</div>
                    <div className="update-date">
                      {moment(item?.messageUpdatedAt).fromNow()}
                    </div>
                    <div
                      className="conversation-message"
                      style={{
                        fontWeight: listUnseenConversations.includes(item._id)
                          ? "bold"
                          : "normal",
                        color: listUnseenConversations.includes(item._id)
                          ? COLOR.darkGreen
                          : COLOR.gray,
                      }}
                    >
                      {item?.listMessages?.[0]?.text ??
                        "You can have a chat now"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="justify-content-center align-items-center p-2 w-100">
                No data to show
              </div>
            )}
          </div>
        </>
      )}
    </Drawer>
  );
}

export default ChatSidebar;
