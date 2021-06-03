import React, { useEffect, useState } from "react";
import { Tooltip, Dropdown, Menu, Row, Typography } from "antd";

import {
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined,
  ToolOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import "../styles.css";

import { Link } from "react-router-dom";
import "../styles.css";
import COLOR from "../../../constants/colors.js";

import { useMobile } from "../../../utils/responsiveQuery";

import * as apiConversation from "../../../api/conversation";

const { Text } = Typography;

const statusList = [
  { status: "online", color: COLOR.green },
  { status: "busy", color: COLOR.red },
  { status: "offline", color: COLOR.gray },
];

function MessageHeader({ setOpenSidebar, currentId, listSeenMembers }) {
  const isMobile = useMobile();

  const [title, setTitle] = useState("");

  useEffect(() => {
    // alert("current" + currentId);
    if (currentId) {
      apiConversation.fetchAConversation(currentId, 0, 0).then((res) => {
        setTitle(res.data.title);
      });
    }
  }, [currentId]);

  const handleOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleChangeStatus = () => {};

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
                  <div>{item}</div>
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
