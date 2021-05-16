import React, { useEffect } from "react";
import { Typography, Menu, Avatar } from "antd";
import moment from "moment";
import styles from "./styles";
import { useSelector } from "react-redux";

const { Text } = Typography;

function NotificationList({ handleClickNotificationItem }) {
  const notifications = useSelector((state) => state.notifications);
  return (
    <Menu>
      {notifications.length === 0 ? (
        <Menu.Item key="no-data" className="whitegreen-button">
          <div className="justify-content-center align-items-center p-2 w-100">
            No data to show
          </div>
        </Menu.Item>
      ) : (
        <>
          {notifications.slice(0, 5).map((item, i) => (
            <Menu.Item
              key={i}
              className="whitegreen-button"
              onClick={() => handleClickNotificationItem(item?.link)}
            >
              <div className="d-flex align-items-center p-2 w-100">
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <div className="d-flex ml-1 flex-column">
                  <Text>{item.content?.description}</Text>
                  <Text type="secondary">
                    {moment(item?.createdAt).fromNow()}
                  </Text>
                </div>
              </div>
            </Menu.Item>
          ))}
          <Menu.Item>
            <div className="text-center">
              <Text strong>See all notifications</Text>
            </div>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}

export default NotificationList;
