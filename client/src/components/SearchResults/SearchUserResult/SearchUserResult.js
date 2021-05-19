import React, { useState, useEffect, useMemo } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import UserCard from "../../../components/UserCard/UserCard";
import GroupCard from "../../../components/GroupCard/GroupCard";
import * as api from "../../../api/search";

const { Content } = Layout;
const { Title, Text } = Typography;

function SearchUserResult({ userNameSearch }) {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    api
      .fetchSearchUser(userNameSearch)
      .then((res) => {
        console.log("LISTALLUSER", userNameSearch);
        console.log(res.data);
        if (res.data instanceof Array) setListUser(res.data);
        else setListUser([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userNameSearch]);

  const listUserCardLeft = useMemo(
    () =>
      listUser?.map((user, i) => {
        if (i % 2 == 0)
          return (
            <UserCard name={user.name} relationship="Add Friend"></UserCard>
          );
      }),
    [listUser]
  );

  const listUserCardRight = useMemo(
    () =>
      listUser?.map((user, i) => {
        if (i % 2 == 1)
          return (
            <UserCard name={user.name} relationship="Add Friend"></UserCard>
          );
      }),
    [listUser]
  );

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
