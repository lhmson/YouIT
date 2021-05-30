import React, { useEffect, useState, useRef } from "react";
import { Input, Button, Drawer, Typography, Badge, Modal, Tooltip, Select, Popover, message } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import styles from "../styles.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import moment from "moment";
import { Link } from "react-router-dom";
import "../styles.css";
import COLOR from "../../../constants/colors.js";
import { useMobile } from "../../../utils/responsiveQuery.js";

import * as apiFriend from '../../../api/friend'
import * as apiConversation from '../../../api/conversation'

const { Title } = Typography;

const { Option } = Select;

const { confirm } = Modal;

const testData = [
  {
    title: "Batman",
    avatar:
      "https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
    newestTime: "Apr 16",
    newestContent: "This is a message",
    current: true,
    status: "online",
  },
  {
    title: "Kim Neil",
    avatar:
      "https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
    newestTime: "6 days ago",
    newestContent: "Yes I love how Python does that",
    current: false,
    status: "offline",
  },
  {
    title: "Kim Neil",
    avatar:
      "https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
    newestTime: "6 days ago",
    newestContent: "Yes I love how Python does that",
    current: false,
    status: "online",
  },
  {
    title: "Kim Neil",
    avatar:
      "https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
    newestTime: "6 days ago",
    newestContent: "Yes I love how Python does that",
    current: false,
    status: "busy",
  },
  {
    title: "Kim Neil",
    avatar:
      "https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
    newestTime: "6 days ago",
    newestContent: "Yes I love how Python does that",
    current: false,
    status: "offline",
  },
];

function ChatSidebar({ isOpen, setIsOpen, currentId, setCurrentId, isAddConversation, setIsAdd }) {
  const isMobile = useMobile();

  const [user] = useLocalStorage("user");

  const searchInputRef = useRef();

  const [visibleAdd, setVisibleAdd] = useState(false);

  const [listFriends, setListFriends] = useState([]);

  const [usersToAdd, setUsersToAdd] = useState([]);

  const [listConversations, setListConversations] = useState([]);

  useEffect(() => {
    apiFriend.fetchListMyFriends(user?.result?._id).then((res) => {
      setListFriends(res.data?.map((item, i) => ({ _id: item._id, name: item.name })));
    })
  }, []);

  useEffect(() => {
    apiConversation.fetchConversationsOfUser().then((res) => {
      setListConversations(res.data);
    })
    setIsAdd(false)
  }, [isAddConversation]);
  // need real time update there

  const handleSearch = () => { };

  const handleChangeUserToAdd = (value, options) => {
    console.log('opt', options)
    // console.log(`selected ${value}`);
    setUsersToAdd(options.map((item) => item.key))
  }

  const handleAddConversation = () => {
    // alert(JSON.stringify(usersToAdd));
    if (usersToAdd.length > 0) {
      apiConversation.createConversation({ listMembers: usersToAdd });
      setIsAdd(true)
    } else {
      message.error('Enter some user to setup')
    }
    setVisibleAdd(false)
  }

  const handleVisibleChange = visibleAdd => {
    setVisibleAdd(visibleAdd)
  };

  const renderStatus = (status) => {
    switch (status) {
      case "online":
        return COLOR.green;
      case "busy":
        return COLOR.red;
      case "offline":
        return COLOR.gray;
      default:
        return COLOR.white;
    }
  };

  const renderAvatar = (item) => {
    if (item.listMembers.length <= 2) {
      return item.avatar ?? 'https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
    } else {
      return "https://cdn.iconscout.com/icon/free/png-256/group-1543545-1306001.png"
    }
  };

  const Header = () => {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <Title>Messages</Title>
          <Tooltip title="Create new conversation">
            <Popover
              content={<Button onClick={handleAddConversation}>Create</Button>}
              title={<Select
                mode="tags"
                placeholder="Add friend"
                value={usersToAdd}
                onChange={handleChangeUserToAdd}
                style={{ width: "100%" }}
              >
                {listFriends?.map((item) => <Option key={item._id}>{item.name}</Option>)}
              </Select>}
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
          </Tooltip>
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
      title={<Header />}
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
            {listConversations.length !== 0 ? (listConversations.map((item, i) => (
              <div key={i} onClick={() => setCurrentId(item._id)}>
                <div className={`conversation ${item._id === currentId && "active"}`}>
                  <Badge dot color={renderStatus(item.status)}>
                    <img src={renderAvatar(item)} alt={item._id} />
                  </Badge>
                  <div className="title-text">{item._id}</div>
                  <div className="update-date">{moment(item.updatedAt).fromNow()}</div>
                  <div className="conversation-message">
                    {item.newestContent ?? "You can have a chat now"}
                  </div>
                </div>
              </div>)
            )) : <div className="justify-content-center align-items-center p-2 w-100">
              No data to show
                </div>}
          </div>
        </>
      )}
    </Drawer>
  );
}

export default ChatSidebar;
