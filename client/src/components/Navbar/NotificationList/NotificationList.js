import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Modal, Typography, Menu, Tooltip, Tabs, Button, Avatar } from "antd";
import moment from "moment";
import COLOR from "../../../constants/colors";
import * as api from "../../../api/notification";
import { useDispatch } from "react-redux";
import { limitNameLength } from "../../../utils/limitNameLength";
import {
  refreshNotifications,
  setSeenNotification,
} from "../../../redux/actions/notifications";

const { Text } = Typography;
const { TabPane } = Tabs;

function NotificationList({ handleClickNotificationItem, notifications }) {
  // const [allNoti, setAllNoti] = useState([]);
  // const [unseenNoti, setUnseenNoti] = useState([]);
  // const [seenNoti, setSeenNoti] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const dispatch = useDispatch();

  const unseenNotifications = useMemo(
    () => notifications?.filter((item) => !item.seen),
    [notifications]
  );

  const handleFetchNoti = useCallback(() => {
    // api.fetchAllNotifications().then((res) => {
    //   setAllNoti(res.data);
    // });
    // api.fetchSeenNotifications().then((res) => {
    //   setSeenNoti(res.data);
    // });
    // api.fetchUnseenNotifications().then((res) => {
    //   setUnseenNoti(res.data);
    // });
  }, []);

  const handleMarkAll = () => {
    unseenNotifications?.forEach((item) => {
      dispatch(setSeenNotification(item._id, "true"));
    });
    dispatch(refreshNotifications());
    setIsUpdate(true);
    Modal.destroyAll();
  };

  useEffect(() => {
    handleFetchNoti();
  }, [handleFetchNoti]);

  useEffect(() => {
    if (isUpdate) {
      handleFetchNoti();
      setIsUpdate(false);
    }
  }, [isUpdate, handleFetchNoti]);

  const NotiList = ({ noti }) => {
    return (
      <>
        {noti?.length === 0 ? (
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
                  {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
                  <div className="d-flex ml-1 flex-column">
                    <Tooltip
                      title={item.content?.description}
                      placement="bottom"
                    >
                      <Text>
                        {limitNameLength(item.content?.description, 54)}
                      </Text>
                    </Tooltip>

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
              <NotiList noti={unseenNotifications} />
            </TabPane>
            {/* <TabPane tab="Seen" key="2">
              <NotiList noti={seenNoti} />
            </TabPane> */}
            <TabPane tab="All" key="3">
              <NotiList noti={notifications} />
            </TabPane>
          </Tabs>
          <Button className="green-button" onClick={handleMarkAll}>
            Mark all as read
          </Button>
        </div>
      ),
      okButtonProps: { style: { display: "none" } },
      closable: true,
      onOk() {},
    });
  }

  return (
    <Menu>
      {unseenNotifications?.length === 0 ? (
        <Menu.Item key="no-data" className="whitegreen-button">
          <div className="justify-content-center align-items-center p-2 w-100">
            No data to show
          </div>
        </Menu.Item>
      ) : (
        <>
          {unseenNotifications?.slice(0, 5).map((item, i) => (
            <Menu.Item
              key={item._id}
              className="whitegreen-button"
              onClick={() => handleClickNotificationItem(item?.link, item?._id)}
            >
              <div
                className="d-flex align-items-center p-2 w-100"
                style={{ backgroundColor: !item?.seen && COLOR.greenSmoke }}
              >
                {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
                <div className="d-flex ml-1 flex-column">
                  <Tooltip title={item.content?.description} placement="bottom">
                    <Text>
                      {limitNameLength(item.content?.description, 54)}
                    </Text>
                  </Tooltip>

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
