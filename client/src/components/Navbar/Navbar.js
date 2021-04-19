import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Layout, Menu, Typography, Avatar, Button } from "antd";
import styles from "./styles";

import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth";

const { Header } = Layout;
const { Text } = Typography;

function Navbar({ selectedMenu }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(logout());
    history.push("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
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
      <div style={styles.logo}>
        <Link to="/">
          <Text style={styles.title}>YouIT</Text>
        </Link>
      </div>
      <Menu
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
          <Link to="/posts/60774246ac807941f418f940">A post</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navbar;
