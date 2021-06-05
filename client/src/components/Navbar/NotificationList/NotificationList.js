import React, { useState, useEffect } from "react";
import { Modal, Typography, Menu, Tabs, Avatar } from "antd";
import moment from "moment";
import styles from "./styles";
import COLOR from "../../../constants/colors";
import * as api from "../../../api/notification";

const { Text } = Typography;
const { TabPane } = Tabs;

function NotificationList({ handleClickNotificationItem, notifications }) {
  const [allNoti, setAllNoti] = useState([]);
  const [unseenNoti, setUnseenNoti] = useState([]);
  const [seenNoti, setSeenNoti] = useState([]);

  useEffect(() => {
    api.fetchAllNotifications().then((res) => {
      setAllNoti(res.data);
    });
    api.fetchSeenNotifications().then((res) => {
      setSeenNoti(res.data);
    });
    api.fetchUnseenNotifications().then((res) => {
      setUnseenNoti(res.data);
    });
  }, []);

  const NotiList = ({ noti }) => {
    return (
      <>
        {allNoti.length === 0 ? (
          <div key="no-data-all" className="whitegreen-button">
            <div className="justify-content-center align-items-center p-2 w-100">
              No data to show
            </div>
          </div>
        ) : (
          <>
            {noti?.map((item, i) => (
              <div
                key={`${item._id}-all`}
                className="whitegreen-button clickable"
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
              </div>
            ))}
          </>
        )}
      </>
    );
  };

  function seeAllNoti() {
    Modal.info({
      title: "Updated news",
      content: (
        <div>
          <Tabs defaultActiveKey="1" size="small" style={{ marginBottom: 32 }}>
            <TabPane tab="Unseen" key="1">
              <NotiList noti={unseenNoti} />
            </TabPane>
            <TabPane tab="Seen" key="2">
              <NotiList noti={seenNoti} />
            </TabPane>
            <TabPane tab="All" key="3">
              <NotiList noti={allNoti} />
            </TabPane>
          </Tabs>
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
          {notifications?.slice(0, 5).map((item, i) => (
            <Menu.Item
              key={item._id}
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
        </>
      )}
      <Menu.Item onClick={() => seeAllNoti()}>
        <div className="text-center">
          <Text strong>See all notifications</Text>
        </div>
      </Menu.Item>
    </Menu>
  );
}

export default NotificationList;
