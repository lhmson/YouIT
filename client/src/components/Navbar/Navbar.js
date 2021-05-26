import React, { useEffect, useRef, useState } from "react";
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
  Button,
  Tooltip,
  Space,
} from "antd";
import styles from "./styles";
import {
  SearchOutlined,
  BellFilled,
  EditFilled,
  MessageFilled,
  LogoutOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useMobile } from "../../utils/responsiveQuery";
import { useMediaQuery } from "react-responsive";

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
  getUserUnseenNotifications,
  setSeenNotification,
} from "../../redux/actions/notifications";
import NotificationList from "./NotificationList/NotificationList";

const { Header } = Layout;
const { Text } = Typography;
const { SubMenu } = Menu;

function Navbar({ selectedMenu, setTxtSearch, txtInitSearch }) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [user, setUser] = useLocalStorage("user");
  const [token, setToken] = useToken();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // const isMobile = useMobile();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 910px)" }); // return true if right size

  const cuteIO = useCuteClientIO();

  //#region notification handle

  const notifications = useSelector((state) => state.notifications);

  const handleClickNotificationItem = (url, notificationId) => {
    dispatch(setSeenNotification(notificationId, "true"));
    history.push(url);
    window.location.reload(); // fix bug push not route
  };

  useEffect(() => {
    if (user) {
      dispatch(getUserUnseenNotifications());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const listener = (event, msg) => {
      if (event.indexOf("Notification") === 0) {
        dispatch(addUserNotifications(msg)); // add noti to it
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
        <Menu.Item key="noti" className="navitem notpickitem text-center">
          <Dropdown
            overlay={NotificationList({
              handleClickNotificationItem,
              notifications,
            })}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Badge count={notifications.length} showZero>
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
          <Tooltip title="Message" placement="bottom">
            <MessageFilled style={{ fontSize: 24, color: COLOR.white }} />
          </Tooltip>
        </Menu.Item>

        <Menu.Item key="avatar" className="text-center navitem">
          <Space>
            <Avatar
              size="large"
              alt={user?.result?.name}
              src={user?.result?.imageUrl}
            >
              <Link
                to={`/userinfo/${user?.result._id}`}
                style={{ color: COLOR.white }}
              >
                {user?.result?.name}
              </Link>
            </Avatar>

            {!isSmallScreen && (
              <Link
                to={`/userinfo/${user?.result._id}`}
                style={{ color: COLOR.white }}
              >
                {user?.result?.name}
              </Link>
            )}
          </Space>
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

  const menuMore = (
    <Menu>
      {isSmallScreen && <MainMenuItems />}
      <Menu.Item key="logout" onClick={() => handleLogOut()}>
        <Row align="middle">
          <LogoutOutlined className=" red mr-2" />
          <Text>Logout</Text>
        </Row>
      </Menu.Item>
    </Menu>
  );

  //#endregion

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
        <div style={styles.logo}>
          <Link to="/">
            <Text style={styles.title}>YouIT</Text>
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
          style={{ backgroundColor: COLOR.lightGreen, width: "40%" }}
          defaultValue={txtInitSearch}
        />

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
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Regiter</Button>
            </Link>
          </>
        )}
      </Row>
    </Header>
  );
}

export default Navbar;
