import React, { useState, useEffect } from "react";
import { Modal, Typography, Menu, Avatar } from "antd";
import moment from "moment";
import styles from "./styles";
import COLOR from "../../../constants/colors";
import * as api from "../../../api/notification";

const { Text } = Typography;

function NotificationList({ handleClickNotificationItem, notifications }) {
  const [allNoti, setAllNoti] = useState([]);
  useEffect(() => {
    api.fetchAllNotifications().then((res) => {
      setAllNoti(res.data);
    });
  }, []);

  function seeAllNoti() {
    Modal.info({
      title: "This is a notification message",
      content: (
        <div>
          <Menu>
            {allNoti.length === 0 ? (
              <Menu.Item key="no-data-all" className="whitegreen-button">
                <div className="justify-content-center align-items-center p-2 w-100">
                  No data to show
                </div>
              </Menu.Item>
            ) : (
              <>
                {allNoti.map((item, i) => (
                  <Menu.Item
                    key={`${i}-all`}
                    className="whitegreen-button"
                    onClick={() =>
                      handleClickNotificationItem(item?.link, item?._id)
                    }
                  >
                    <div
                      className="d-flex align-items-center p-2 w-100"
                      style={{
                        backgroundColor: !item?.seen && COLOR.greenSmoke,
                      }}
                    >
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
              </>
            )}
          </Menu>
        </div>
      ),
      onOk() {},
    });
  }

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
              onClick={() => handleClickNotificationItem(item?.link, item?._id)}
            >
              <div
                className="d-flex align-items-center p-2 w-100"
                style={{ backgroundColor: !item?.seen && COLOR.greenSmoke }}
              >
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
          <Menu.Item onClick={() => seeAllNoti()}>
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
