import React, { useEffect, useRef } from "react";
import { Input, Button, Drawer, Typography, Badge, Tooltip } from "antd";

import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";

import styles from "../styles.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { Link } from "react-router-dom";
import "../styles.css";
import COLOR from "../../../constants/colors.js";
import { useMobile } from "../../../utils/responsiveQuery.js";

const { Title } = Typography;

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

function ChatSidebar({ isOpen, setIsOpen }) {
  const isMobile = useMobile();

  const [user] = useLocalStorage("user");

  const searchInputRef = useRef();

  useEffect(() => {}, []);

  const handleSearch = () => {};

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

  const Header = () => {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <Title>Messages</Title>
          <Tooltip title="Create new conversation">
            <Button
              className="d-flex justify-content-center align-items-center green-button mr-3"
              icon={<PlusCircleOutlined />}
            >
              Add
            </Button>
          </Tooltip>
        </div>

        <div class="search-container">
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
      // onClick={() => setDrawerVisible(false)}
      onClose={() => setIsOpen(false)}
      visible={isOpen}
    >
      {isOpen && (
        <>
          <div className="conversation-list">
            {testData.map((item, i) => (
              <>
                <div className={`conversation ${item.current && "active"}`}>
                  <Badge dot color={renderStatus(item.status)}>
                    <img src={item.avatar} alt={item.title} />
                  </Badge>
                  <div className="title-text">{item.title}</div>
                  <div className="created-date">{item.newestTime}</div>
                  <div className="conversation-message">
                    {item.newestContent}
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </Drawer>
  );
}

export default ChatSidebar;
