import React, { useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Layout, Typography, Row, Input, Avatar } from "antd";
import styles from "./styles";
import {
  SearchOutlined,
  BellFilled,
  EditFilled,
  MessageFilled,
  EllipsisOutlined,
} from "@ant-design/icons";

import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth";
import COLOR from "../../constants/colors";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useToken } from "../../context/TokenContext";

const { Header } = Layout;
const { Text } = Typography;

function Navbar({ selectedMenu }) {
  const [user, setUser] = useLocalStorage("user");
  const [token, setToken] = useToken();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleSearch = () => console.log(inputRef.current.state.value);

  const handleNoti = () => alert("handle noti");

  const handlePost = () => alert("handle post");

  const handleMessage = () => alert("handle message");

  const handleLogOut = async () => {
    await dispatch(logout(setUser, setToken));
    history.push("/login");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout(setUser, setToken));
      }
    }

    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  return (
    <Header
      style={{
        ...styles.greenBackground,
        ...styles.fixedHeader,
      }}
    >
      <Row className="align-items-center justify-content-around">
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
          style={{ backgroundColor: COLOR.lightGreen, width: "40vw" }}
        />

        <BellFilled
          onClick={handleNoti}
          style={{ fontSize: 24, color: COLOR.white }}
        />
        <EditFilled
          onClick={handlePost}
          style={{ fontSize: 24, color: COLOR.white }}
        />
        <MessageFilled
          onClick={handleMessage}
          style={{ fontSize: 24, color: COLOR.white }}
        />

        <Avatar alt={user?.result?.name} src={user?.result?.imageUrl}>
          {user?.result?.name.charAt(0)}
        </Avatar>

        <EllipsisOutlined
          onClick={handleLogOut}
          style={{ fontSize: 24, color: COLOR.white }}
        />
      </Row>
      {/* <Menu
        style={styles.greenBackground}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectedMenu]}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="feed">
          <Link to="/feed">Feed</Link>
        </Menu.Item>
        {user ? (
          <>
            <div style={styles.right}>
              <Text className="text-white">{user.result.name}</Text>
              <Avatar
                className="mx-2"
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Button>
                <Link to="/" onClick={handleLogOut}>
                  Logout
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <Menu.Item key="auth">
            <Link to="/auth">Sign In</Link>
          </Menu.Item>
        )}
        <Menu.Item key="test">
          <Link to="/posts/60821adcd9bd84174cecee9f">A post</Link>
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Link to="/userinfo">User Info</Link>
        </Menu.Item>

        <Menu.Item key="createPost">
          <Link to="/post/create">Create post</Link>
        </Menu.Item>
      </Menu> */}
    </Header>
  );
}

export default Navbar;
