import React, { useEffect, useRef, useMemo, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Layout,
  Typography,
  Row,
  Input,
  Menu,
  Dropdown,
  Avatar,
  Badge,
  Tooltip,
  notification,
  Button,
} from "antd";
import styles from "./styles";
import logo from "../../assets/darklogo.png";
import {
  SearchOutlined,
  BellFilled,
  EditFilled,
  MessageFilled,
  LogoutOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PicLeftOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useMobile } from "../../utils/responsiveQuery";
import { useMediaQuery } from "react-responsive";
import { GrStatusGoodSmall } from "react-icons/gr";

import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/auth";
import COLOR from "../../constants/colors";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useToken } from "../../context/TokenContext";
import { useCuteClientIO } from "../../socket/CuteClientIOProvider";

import {
  addUserNotifications,
  refreshNotifications,
  setSeenNotification,
  getUserNotifications,
} from "../../redux/actions/notifications";
import * as apiConversation from "../../api/conversation";
import NotificationList from "./NotificationList/NotificationList";
import { useMessage } from "../../hooks/useMessage";
import { renderStatus, statusList } from "../../utils/userStatus";
import { setMyStatus } from "../../api/userStatus";
import { useFriendsStatus } from "../../context/FriendsStatusContext";
import { useCurrentUser } from "../../context/CurrentUserContext";

const { Header } = Layout;
const { Text } = Typography;

function Navbar({ selectedMenu, setTxtSearch, txtInitSearch }) {
  const [user, setUser] = useLocalStorage("user");
  const [currentUser] = useCurrentUser();
  const [token, setToken] = useToken();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // const isMobile = useMobile();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1042px)" }); // return true if right size

  const cuteIO = useCuteClientIO();

  //#region notification handle

  const notifications = useSelector((state) => state.notifications);
  const unseenNotifications = useMemo(
    () => notifications?.filter((item) => !item.seen),
    [notifications]
  );

  const handleClickNotificationItem = (url, notificationId) => {
    dispatch(setSeenNotification(notificationId, "true", history, url));

    // window.location.reload();
    // setTimeout(location.reload); // fix bug push not route
  };

  useEffect(() => {
    if (user) {
      dispatch(getUserNotifications());
    }
  }, [user, dispatch]);

  const openNotification = (msg) => {
    // alert("abc");
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        className="green-button"
        onClick={() => handleClickNotificationItem(msg?.link, msg?._id)}
      >
        Check out
      </Button>
    );
    notification.open({
      message: "Something new for you to see",
      description: msg?.content?.description ?? "",
      onClick: () => {
        handleClickNotificationItem(msg?.link, msg?._id);
      },
      key,
      duration: 3,
      placement: "bottomRight",
      btn,
    });
  };

  useEffect(() => {
    const listener = (event, msg) => {
      if (event.indexOf("Notification") === 0) {
        dispatch(addUserNotifications(msg)); // add noti to it
        // console.log("noti", msg);
        openNotification(msg);
      }
    };
    cuteIO.onReceiveAny(listener);

    return () => {
      cuteIO.stopReceiveAny(listener);
    };
  }, [cuteIO]);

  //#endregion

  const handleSearch = () => {
    if (setTxtSearch !== undefined) setTxtSearch(inputRef.current.state.value);
    history.push({
      pathname: "/search",
      state: { txtSearch: inputRef.current.state.value },
    });
  };

  const handlePost = () => {
    history.push("/post/create");
  };

  const handleFeed = () => {
    history.push("/feed");
  };

  const handleMessage = () => {
    history.push("/message");
  };

  const MainMenuItems = () => {
    return (
      <Menu
        style={styles.greenBackground}
        theme="dark"
        mode={!isSmallScreen ? "horizontal" : "vertical"}
        defaultSelectedKeys={[selectedMenu]}
      >
        <Menu.Item
          key="feed"
          className="navitem pickitem text-center"
          onClick={handleFeed}
        >
          <Tooltip title="Feed" placement="bottom">
            <GlobalOutlined style={{ fontSize: 24, color: COLOR.white }} />
          </Tooltip>
        </Menu.Item>

        <Menu.Item key="noti" className="navitem notpickitem text-center">
          <Dropdown
            overlay={NotificationList({
              handleClickNotificationItem,
              notifications,
            })}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Badge count={unseenNotifications.length} showZero>
              <Tooltip title="Notifications" placement="bottom">
                <BellFilled
                  className="clickable"
                  // onClick={handleNoti}
                  style={{ fontSize: 24, color: COLOR.white }}
                />
              </Tooltip>
            </Badge>
          </Dropdown>
        </Menu.Item>

        <Menu.Item
          key="edit"
          className="navitem pickitem text-center"
          onClick={handlePost}
        >
          <Tooltip title="Post" placement="bottom">
            <EditFilled style={{ fontSize: 24, color: COLOR.white }} />
          </Tooltip>
        </Menu.Item>

        <Menu.Item
          key="message"
          className="text-center navitem pickitem"
          onClick={handleMessage}
        >
          <Badge count={numberUnseenMessages}>
            <Tooltip title="Message" placement="bottom">
              <MessageFilled style={{ fontSize: 24, color: COLOR.white }} />
            </Tooltip>
          </Badge>
        </Menu.Item>

        <Menu.Item key="avatar" className="text-center navitem notpickitem">
          <Tooltip
            title={
              <div className="text-center">
                <div>{currentUser?.name}</div>
                <Dropdown
                  overlay={menuStatus}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Tooltip title="Status" placement="right">
                    <GrStatusGoodSmall
                      className="icon"
                      style={{
                        color: renderStatus(
                          friendsStatusManager.getStatus(currentUser?._id)
                        ),
                      }}
                    />
                  </Tooltip>
                </Dropdown>
              </div>
            }
            placement="bottom"
          >
            <Avatar
              size="large"
              alt={currentUser?.name}
              src={currentUser?.avatarUrl}
              onClick={() => history.push(`/userinfo/${currentUser?._id}`)}
            >
              {currentUser?.name}
            </Avatar>
          </Tooltip>
        </Menu.Item>
      </Menu>
    );
  };

  //#region menuMore
  const handleLogOut = async () => {
    // await dispatch(logout(setUser, token, setToken));
    // await dispatch(refreshNotifications());
    // history.push("/login");
    const browserId = JSON.parse(localStorage.getItem("browser"))?.id;

    await dispatch(signout(browserId));
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleSettings = async () => {
    history.push("/settings");
  };

  const handleCreateGroup = async () => {
    history.push("/group/create");
  };

  const friendsStatusManager = useFriendsStatus();

  const handleChangeStatus = (status) => {
    setMyStatus(status);
  };

  const menuStatus = (
    <Menu>
      {statusList.map((item, i) => (
        <Menu.Item key={i} onClick={() => handleChangeStatus(item.status)}>
          <Row align="middle" style={{ color: item.color }}>
            <GrStatusGoodSmall className="mr-2" />
            <Text>{item.status}</Text>
          </Row>
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuMore = (
    <Menu>
      {isSmallScreen && <MainMenuItems />}
      <Menu.Item key="settings" onClick={() => handleSettings()}>
        <Row align="middle">
          <SettingOutlined className="mr-lg-2" />
          <Text>Settings</Text>
        </Row>
      </Menu.Item>
      <Menu.Item key="createGroup" onClick={() => handleCreateGroup()}>
        <Row align="middle">
          <PicLeftOutlined className="mr-lg-2" />
          <Text>Add group</Text>
        </Row>
      </Menu.Item>
      {/* <Dropdown
        overlay={menuStatus}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Tooltip title="Status" placement="right">
          <GrStatusGoodSmall className="clickable icon" />
        </Tooltip>
      </Dropdown> */}

      <Menu.Item key="logout" onClick={() => handleLogOut()}>
        <Row align="middle">
          <LogoutOutlined className=" red mr-2" />
          <Text>Logout</Text>
        </Row>
      </Menu.Item>
    </Menu>
  );

  const menuAuth = (
    <Menu className="bg-green-smoke">
      <Menu.Item key="login" className="text-center">
        <Link to="/login">
          <Text>Login</Text>
        </Link>
      </Menu.Item>
      <Menu.Item key="signup" className="text-center">
        <Link to="/register">
          <Text>Register</Text>
        </Link>
      </Menu.Item>
    </Menu>
  );

  //#endregion

  //#region message notifications

  const [numberUnseenMessages, setNumberUnseenMessages] = useState(0);

  const messageHandle = useMessage();

  const handleFetchListUnseenConversations = () => {
    apiConversation
      .fetchUnseenConversationId()
      .then((res) => setNumberUnseenMessages(res.data.length));
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
  //   const token = user?.token;

  //   if (token) {
  //     const decodedToken = decode(token);

  //     if (decodedToken.exp * 1000 < new Date().getTime()) {
  //       dispatch(logout(setUser, setToken));
  //     }
  //   }

  //   setUser(JSON.parse(localStorage.getItem("user")));
  // }, [location]);

  return (
    <Header
      style={{
        ...styles.greenBackground,
        ...styles.fixedHeader,
      }}
    >
      <Row className="align-items-center justify-content-between">
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ width: isSmallScreen ? "80%" : "50%" }}
        >
          <div style={styles.logo}>
            <Link to="/">
              <img src={logo} alt="Logo" height="58" className="mr-2" />
            </Link>
          </div>
          <Input
            onPressEnter={handleSearch}
            allowClear
            suffix={
              <SearchOutlined
                onClick={handleSearch}
                style={{ fontSize: 24, color: COLOR.white }}
              />
            }
            ref={inputRef}
            bordered={false}
            style={{ backgroundColor: COLOR.lightGreen }}
            defaultValue={txtInitSearch}
          />
        </div>

        {user ? (
          <div className="d-flex">
            {!isSmallScreen && <MainMenuItems />}

            <Menu theme="dark" mode="horizontal" style={styles.greenBackground}>
              <Dropdown
                overlay={menuMore}
                trigger={["click"]}
                placement="bottomCenter"
              >
                <EllipsisOutlined
                  style={{ fontSize: 24, color: COLOR.white }}
                />
              </Dropdown>
            </Menu>
          </div>
        ) : (
          <>
            <Menu
              style={styles.greenBackground}
              theme="dark"
              mode={!isSmallScreen ? "horizontal" : "vertical"}
              defaultSelectedKeys={[selectedMenu]}
            >
              {!isSmallScreen ? (
                menuAuth
              ) : (
                <Dropdown
                  overlay={menuAuth}
                  trigger={["click"]}
                  placement="bottomCenter"
                >
                  <EllipsisOutlined
                    style={{ fontSize: 24, color: COLOR.white }}
                  />
                </Dropdown>
              )}
            </Menu>
          </>
        )}
      </Row>
    </Header>
  );
}

export default Navbar;
