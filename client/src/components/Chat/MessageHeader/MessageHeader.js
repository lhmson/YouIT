import React, { useEffect } from "react";
import { Tooltip, Dropdown, Menu, Row, Typography } from "antd";

import {
  SearchOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ToolOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import "../styles.css";

import { Link } from "react-router-dom";
import "../styles.css";
import COLOR from "../../../constants/colors.js";

import { useMobile } from "../../../utils/responsiveQuery";

const { Text } = Typography;

const statusList = [
  { title: "online", color: COLOR.green },
  { title: "busy", color: COLOR.red },
  { title: "offline", color: COLOR.gray },
];

function MessageHeader({ setOpenSidebar, currentId }) {
  const isMobile = useMobile();

  useEffect(() => {

  }, []);

  const handleOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleChangeStatus = () => { };

  const menuStatus = (
    <Menu>
      {statusList.map((item, i) => (
        <Menu.Item key="i" onClick={() => handleChangeStatus(item.title)}>
          <Row align="middle" style={{ color: item.color }}>
            <EnvironmentOutlined className="mr-2" />
            <Text>{item.title}</Text>
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

      <span className="text-center">{currentId && (isMobile ? currentId.substring(0, 12) + "..." : currentId)}</span>
      <Tooltip title="Delete conversation">
        <DeleteOutlined className="clickable icon" />
      </Tooltip>
    </div>
  );
}

export default MessageHeader;
