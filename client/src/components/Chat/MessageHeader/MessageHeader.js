import React, { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  Dropdown,
  Menu,
  Row,
  Popover,
  Button,
  Typography,
  Input,
  Select,
} from "antd";

import {
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined,
  ToolOutlined,
  EditOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import "../styles.css";

import { Link } from "react-router-dom";
import "../styles.css";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import COLOR from "../../../constants/colors.js";

import { useMobile } from "../../../utils/responsiveQuery";

import * as apiFriend from "../../../api/friend";
import * as apiConversation from "../../../api/conversation";

const { Text } = Typography;

const { Option } = Select;

const statusList = [
  { status: "online", color: COLOR.green },
  { status: "busy", color: COLOR.red },
  { status: "offline", color: COLOR.gray },
];

function MessageHeader({ setOpenSidebar, currentId, listSeenMembers }) {
  const isMobile = useMobile();

  const [user] = useLocalStorage("user");

  const [title, setTitle] = useState("");

  const titleRef = useRef();

  const [visibleEdit, setVisibleEdit] = useState(false); // select display

  const [listFriends, setListFriends] = useState([]);

  const [listMembers, setListMembers] = useState([]);

  useEffect(() => {
    // alert("current" + currentId);
    if (currentId) {
      apiConversation.fetchAConversation(currentId, 0, 0).then((res) => {
        setTitle(res.data.title);
      });
    }
  }, [currentId]);

  useEffect(() => {
    apiFriend.fetchListMyFriends(user?.result?._id).then((res) => {
      setListFriends(
        res.data?.map((item, i) => ({ _id: item._id, name: item.name }))
      );
    });
  }, []);

  const handleOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleChangeStatus = () => {};

  const handleEditConversation = () => {};

  const handleCancelEdit = () => {
    setTitle("");
    setListMembers("");
  };

  const handleChangeUserToAdd = (value, options) => {
    // console.log("opt", options);
    // console.log(`selected ${value}`);
    setListMembers(options?.map((item) => item.key));
  };

  const handleVisibleChange = (visibleAdd) => {
    setVisibleEdit(visibleAdd);
  };

  const menuStatus = (
    <Menu>
      {statusList.map((item, i) => (
        <Menu.Item key={i} onClick={() => handleChangeStatus(item.status)}>
          <Row align="middle" style={{ color: item.color }}>
            <EnvironmentOutlined className="mr-2" />
            <Text>{item.status}</Text>
          </Row>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="chat-title">
      <div className="d-flex align-items-center">
        <Tooltip title="Search conversation" placement="right">
          <SearchOutlined
            className="clickable icon mr-3"
            onClick={() => handleOpenSidebar()}
          />
        </Tooltip>
        <Dropdown
          overlay={menuStatus}
          trigger={["click", "hover"]}
          placement="bottomRight"
        >
          <Tooltip title="Status" placement="right">
            <ToolOutlined className="clickable icon" />
          </Tooltip>
        </Dropdown>

        <Popover
          content={
            <>
              <Button onClick={() => handleEditConversation()}>Confirm</Button>
              <Button onClick={() => handleCancelEdit()}>Cance;</Button>
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
                value={listMembers}
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
          visible={visibleEdit}
          onVisibleChange={handleVisibleChange}
        >
          <Button
            className="d-flex justify-content-center align-items-center green-button ml-3"
            icon={<EditOutlined />}
          >
            Edit
          </Button>
        </Popover>
      </div>

      <span className="text-center">
        {currentId && (isMobile ? title.substring(0, 12) + "..." : title)}
      </span>
      <div className="d-flex">
        {listSeenMembers && (
          <Tooltip
            title={
              <div>
                {listSeenMembers.map((item) => (
                  <div>{item.name}</div>
                ))}
              </div>
            }
            placement="bottom"
          >
            <EyeOutlined className="clickable icon mr-2" />
          </Tooltip>
        )}

        <Tooltip title="Delete conversation">
          <DeleteOutlined className="clickable icon" />
        </Tooltip>
      </div>
    </div>
  );
}

export default MessageHeader;
