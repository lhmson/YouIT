import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { getPosts } from "../../../redux/actions/posts";
import UserCard from "../../../components/UserCard/UserCard";
import GroupCard from "../../../components/GroupCard/GroupCard";

const { Content } = Layout;
const { Title, Text } = Typography;

function SearchUserResult({ userNameSearch }) {
  let listAllUser = [
    { userName: "Sanh" },
    { userName: "Sanh cute" },
    { userName: "Sanh đẹp trai" },
    { userName: "Thảo" },
    { userName: "Tiến" },
    { userName: "Sơn" },
    { userName: "Hậu" },
    { userName: "Nghĩa" },
  ];

  let txtSearch = userNameSearch ?? "";

  let listUser = listAllUser.filter((x) => x.userName.includes(txtSearch));

  const listUserCardLeft = listUser.map((user, i) => {
    if (i % 2 == 0) return <UserCard name={user.userName}></UserCard>;
  });

  const listUserCardRight = listUser.map((user, i) => {
    if (i % 2 == 1) return <UserCard name={user.userName}></UserCard>;
  });

  return (
    <div className="col-10 offset-1">
      <div
        className="row"
        style={{
          height: 900,
          paddingTop: 16,
          paddingLeft: 32,
          marginLeft: 128,
        }}
      >
        <div className="col-6">
          <ul>{listUserCardLeft}</ul>
        </div>
        <div className="col-6">
          <ul>{listUserCardRight}</ul>
        </div>
      </div>
    </div>
  );
}

export default SearchUserResult;
