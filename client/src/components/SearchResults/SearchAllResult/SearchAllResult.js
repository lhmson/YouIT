import React, { useState, useEffect, useMemo } from "react";
import { Row } from "antd";
import FeedPost from "../../Posts/FeedPosts/FeedPost/FeedPost";
import * as api from "../../../api/search";
import * as api1 from "../../../api/friend";
import GroupCard from "../../../components/GroupCard/GroupCard";
import UserCard from "../../../components/UserCard/UserCard";
import NoDataSearch from "../../../components/NoDataSearch/NoDataSearch";
import { useMobile } from "../../../utils/responsiveQuery";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import LoadingSearch from "../../../components/Loading/LoadingSearch.js";

const SearchAllResult = ({ txtSearch }) => {
  const [listPost, setListPost] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [user, setUser] = useLocalStorage("user");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    setLoading1(false);
    setLoading2(false);
    setLoading3(false);
    // api1
    //   .fetchListMyFriends("60a142289080334c3c2e69ea")
    //   .then((res) => {
    //     console.log("bạn bè", res.data);
    //     setLoading1(true);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // /// fetch data search post
    api
      .fetchSearchPost(txtSearch)
      .then((res) => {
        if (res.data instanceof Array) setListPost(res.data);
        else setListPost([]);
        setLoading1(true);
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
        setLoading2(true);
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
        setLoading3(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [txtSearch]);

  const listPostCard = useMemo(
    () =>
      listPost?.map((post, i) => {
        return <FeedPost key={post._id} post={post}></FeedPost>;
      }),
    [listPost]
  );

  const listGroupCard = useMemo(
    () =>
      listGroup?.map((group, i) => {
        let status = "Join";
        for (let i = 0; i < group?.listMembers?.length; i++)
          if (group?.listMembers[i]?.userId === user?.result._id) {
            status = "Joined";
            break;
          }

        for (let i = 0; i < group?.listPendingMembers?.length; i++)
          if (group?.listPendingMembers[i]?.userId === user?.result._id) {
            status = "Cancel request";
            break;
          }

        return (
          <GroupCard
            key={i}
            _id={group._id}
            nameGroup={group.name}
            description={group.description}
            totalMembers={group.listMembers?.length}
            status={status}
          ></GroupCard>
        );
      }),
    [listGroup]
  );

  const listUserCard = useMemo(
    () =>
      listUser?.map((user, i) => {
        return (
          <UserCard
            key={user._id}
            _id={user._id}
            name={user.name}
            relationship="Add Friend"
          ></UserCard>
        );
      }),
    [listUser]
  );

  let checkNoData =
    listPostCard.length === 0 &&
    listGroupCard.length === 0 &&
    listUserCard.length === 0;

  if (!loading1 || !loading2 || !loading3)
    return (
      <div
        className="row justify-content-center"
        style={{
          paddingTop: 16,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        <div className={`${!isMobile && "col-12"}`}>
          <LoadingSearch></LoadingSearch>
        </div>
      </div>
    );

  return (
    // <div className="col-12">
    <div
      className="row justify-content-center"
      style={{
        paddingTop: 16,
        paddingLeft: 32,
        paddingRight: 32,
      }}
    >
      <div
        className={`${!isMobile && "col-12"}`}
        style={{ marginRight: checkNoData ? 32 : 0 }}
      >
        {listPostCard} {listGroupCard} {listUserCard}
        {checkNoData ? <NoDataSearch></NoDataSearch> : null}
      </div>
    </div>
    // </div>
  );
};

export default SearchAllResult;
