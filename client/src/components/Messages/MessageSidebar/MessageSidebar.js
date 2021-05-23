// import React, { useEffect } from "react";
// import { Layout, Menu, Avatar } from "antd";

// import styles from "./styles.js";
// import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
// import { Link } from "react-router-dom";

// const { Sider } = Layout;

// function MessageSidebar() {
//   const [user] = useLocalStorage("user");

//   useEffect(() => {}, []);

//   return (
//     <Sider
//       //   width={500}
//       breakpoint="lg"
//       collapsedWidth="0"
//       onBreakpoint={(broken) => {
//         console.log(broken);
//       }}
//       onCollapse={(collapsed, type) => {
//         console.log(collapsed, type);
//       }}
//       style={{
//         ...styles.paleBackground,
//         ...styles.fixedSider,
//       }}
//     >
//       <Menu
//         mode="inline"
//         defaultSelectedKeys={["username"]}
//         // defaultOpenKeys={["1"]}
//         style={{
//           height: "100%",
//           borderRight: 0,
//           fontWeight: 500,
//           fontSize: "1rem",
//         }}
//       >
//         {/* <SubMenu key="sub1" title="subnav 1"> */}

//         {/* <Menu.Item
//           key="username"
//           style={styles.item}
//           icon={
//             <Avatar alt={user?.result?.name} src={user?.result?.imageUrl}>
//               {user?.result?.name.charAt(0)}
//             </Avatar>
//           }
//         >
//           <Link to={`/userinfo/${user?.result._id}`}>{user?.result?.name}</Link>
//         </Menu.Item> */}

//         <Menu.Item
//           key="all"
//           style={styles.item}
//           icon={<Avatar style={styles.transparent} />}
//         >
//           All
//         </Menu.Item>

//         <Menu.Item
//           key="friends"
//           style={styles.item}
//           icon={<Avatar style={styles.transparent} />}
//         >
//           Friends
//         </Menu.Item>
//         <Menu.Item
//           key="group"
//           style={styles.item}
//           icon={<Avatar style={styles.transparent} />}
//         >
//           Groups
//         </Menu.Item>
//         {/* </SubMenu> */}
//       </Menu>
//     </Sider>
//   );
// }

// export default MessageSidebar;
