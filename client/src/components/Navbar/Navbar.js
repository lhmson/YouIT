import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Layout, Menu, Typography, Avatar } from "antd";
import styles from "./styles";

import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth";

const { Header } = Layout;
const { Title, Text } = Typography;

function Navbar({ selectedMenu }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log("user", user);

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
    <>
      <Header className="header">
        <div style={styles.logo}>
          <Link to="/">
            <Title type="success">YouIT</Title>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[selectedMenu]}
        >
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          {user ? (
            <>
              <div style={styles.navItem}>
                <Avatar alt={user.result.name} src={user.result.imageUrl}>
                  {user.result.name.charAt(0)}
                </Avatar>
                <Text className="text-white m-2">{user.result.name}</Text>
              </div>
              <Menu.Item key="logout">
                <Link to="/" onClick={handleLogOut}>
                  Logout
                </Link>
              </Menu.Item>
            </>
          ) : (
            <Menu.Item key="auth">
              <Link to="/auth">Sign In</Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
    </>
  );
}

export default Navbar;
