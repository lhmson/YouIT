import React, { useEffect } from "react";
import { Layout, Menu, Avatar } from "antd";

import styles from "./styles.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { Link } from "react-router-dom";
import "../styles.css";

const { Sider } = Layout;

function MessageSidebar() {
  const [user] = useLocalStorage("user");

  useEffect(() => {}, []);

  return (
    // <Sider
    //   width={350}
    //   breakpoint="lg"
    //   collapsedWidth="0"
    //   style={{
    //     ...styles.paleBackground,
    //     ...styles.fixedSider,
    //   }}
    // >
    //   <div style={styles.searchContainer}>
    //     <input type="text" placeholder="Search" style={styles.input} />
    //   </div>
    //   <Menu
    //     mode="inline"
    //     defaultSelectedKeys={["username"]}
    //     // defaultOpenKeys={["1"]}
    //     style={{
    //       height: "100%",
    //       borderRight: 0,
    //       fontWeight: 500,
    //       fontSize: "1rem",
    //     }}
    //   >
    //     <Menu.Item
    //       key="username"
    //       style={styles.item}
    //       icon={
    //         <Avatar alt={user?.result?.name} src={user?.result?.imageUrl}>
    //           {user?.result?.name.charAt(0)}
    //         </Avatar>
    //       }
    //     >
    //       <Link to={`/userinfo/${user?.result._id}`}>{user?.result?.name}</Link>
    //     </Menu.Item>

    //     <Menu.Item
    //       key="all"
    //       style={styles.item}
    //       icon={<Avatar style={styles.transparent} />}
    //     >
    //       All
    //     </Menu.Item>
    //   </Menu>
    // </Sider>
    <>
      <div className="search-container">
        <input type="text" placeholder="Search" />
      </div>

      <div className="conversation-list">
        <div className="conversation active">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="Daryl Duckmanton"
          />
          <div className="title-text">Daryl Duckmanton</div>
          <div className="created-date">Apr 16</div>
          <div className="conversation-message">This is a message</div>
        </div>
        <div className="conversation">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="Kim O'Neil"
          />
          <div className="title-text">Kim O'Neil</div>
          <div className="created-date">2 days ago</div>
          <div className="conversation-message">Very funny</div>
        </div>
        <div className="conversation">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="John Anderson"
          />
          <div className="title-text">John Anderson</div>
          <div className="created-date">1 week ago</div>
          <div className="conversation-message">
            Yes I love how Python does that
          </div>
        </div>
        <div className="conversation">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="John Anderson"
          />
          <div className="title-text">John Anderson</div>
          <div className="created-date">1 week ago</div>
          <div className="conversation-message">
            Yes I love how Python does that
          </div>
        </div>
        <div className="conversation">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="John Anderson"
          />
          <div className="title-text">John Anderson</div>
          <div className="created-date">1 week ago</div>
          <div className="conversation-message">
            Yes I love how Python does that
          </div>
        </div>
        <div className="conversation">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="John Anderson"
          />
          <div className="title-text">John Anderson</div>
          <div className="created-date">1 week ago</div>
          <div className="conversation-message">
            Yes I love how Python does that
          </div>
        </div>
        <div className="conversation">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="John Anderson"
          />
          <div className="title-text">John Anderson</div>
          <div className="created-date">1 week ago</div>
          <div className="conversation-message">
            Yes I love how Python does that
          </div>
        </div>
        <div className="conversation">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="John Anderson"
          />
          <div className="title-text">John Anderson</div>
          <div className="created-date">1 week ago</div>
          <div className="conversation-message">
            Yes I love how Python does that
          </div>
        </div>
        <div className="conversation">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="Ben Smith"
          />
          <div className="title-text">Ben Smith</div>
          <div className="created-date">2:49 PM</div>
          <div className="conversation-message">Yeah Miami Heat are done</div>
        </div>
        <div className="conversation">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="Douglas Johannasen"
          />
          <div className="title-text">Douglas Johannasen</div>
          <div className="created-date">6:14 PM</div>
          <div className="conversation-message">No it does not</div>
        </div>
        <div className="conversation">
          <img
            src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="Jacob Manly"
          />
          <div className="title-text">Jacob Manly</div>
          <div className="created-date">3 secs ago</div>
          <div className="conversation-message">
            Just be very careful doing that
          </div>
        </div>
      </div>

      <div className="new-message-container">
        <a href="#">+</a>
      </div>
    </>
  );
}

export default MessageSidebar;
