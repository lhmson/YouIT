import { Select } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import * as api from "../../../api/friend";

const { Option } = Select;

function CreateGroupMembers({ onChange }) {
  const [user, setUser] = useLocalStorage("user");
  const [listFriend, setListFriend] = useState([]);

  useEffect(() => {
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
        mode="multiple"
        // size={size}
        placeholder="Add Members"
        onChange={onChange}
        style={{ width: "100%" }}
      >
        {listYourFriend}
      </Select>
    </>
  );
}

export default CreateGroupMembers;
