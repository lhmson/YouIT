import { Select } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import * as api from "../../../api/friend";
import styles from "./styles.js";

const { Option } = Select;

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

function CreateGroupMembers() {
  const [user, setUser] = useLocalStorage("user");
  const [listFriend, setListFriend] = useState([]);

  useEffect(() => {
    console.log("User", user);
    api
      .fetchListMyFriends(user?.result?._id)
      .then((res) => {
        console.log(res.data);
        if (res.data instanceof Array) setListFriend(res.data);
        else setListFriend([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user]);

  const listYourFriend = useMemo(
    () =>
      listFriend?.map((user, i) => {
        return <Option key={user._id}>{user.name}</Option>;
      }),
    [listFriend]
  );

  return (
    <>
      <Select
        mode="tags"
        // size={size}
        placeholder="Invite your friends"
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        {listYourFriend}
      </Select>
    </>
  );
}

export default CreateGroupMembers;
