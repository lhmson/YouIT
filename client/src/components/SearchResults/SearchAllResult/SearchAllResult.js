import React, { useState, useEffect, useMemo } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import FeedPost from "../../Posts/FeedPosts/FeedPost/FeedPost";
import * as api from "../../../api/search";
import * as api1 from "../../../api/friend";
import GroupCard from "../../../components/GroupCard/GroupCard";
import UserCard from "../../../components/UserCard/UserCard";

const SearchAllResult = ({ txtSearch }) => {
  const [listPost, setListPost] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listGroup, setListGroup] = useState([]);

  useEffect(() => {
    api1
      .fetchListMyFriends("60a142289080334c3c2e69ea")
      .then((res) => {
        console.log("bạn bè", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    /// fetch data search post
    api
      .fetchSearchPost(txtSearch)
      .then((res) => {
        if (res.data instanceof Array) setListPost(res.data);
        else setListPost([]);
      })
      .catch((e) => {
        console.log(e);
      });
    /// fetch data search group
    api
      .fetchSearchGroup(txtSearch)
      .then((res) => {
        if (res.data instanceof Array) setListGroup(res.data);
        else setListGroup([]);
      })
      .catch((e) => {
        console.log(e);
      });

    /// fetch data search user
    api
      .fetchSearchUser(txtSearch)
      .then((res) => {
        if (res.data instanceof Array) setListUser(res.data);
        else setListUser([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [txtSearch]);

  const listPostCard = useMemo(
    () =>
      listPost?.map((post, i) => {
        return <FeedPost post={post}></FeedPost>;
      }),
    [listPost]
  );

  const listGroupCard = useMemo(
    () =>
      listGroup?.map((group, i) => {
        return <GroupCard _id={group._id} nameGroup={group.name}></GroupCard>;
      }),
    [listGroup]
  );

  const listUserCard = useMemo(
    () =>
      listUser?.map((user, i) => {
        return (
          <UserCard
            _id={user._id}
            name={user.name}
            relationship="Add Friend"
          ></UserCard>
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
        <div className="col-10 offset-1">
          {listPostCard} {listGroupCard} {listUserCard}
        </div>
      </div>
    </div>
  );
};

export default SearchAllResult;