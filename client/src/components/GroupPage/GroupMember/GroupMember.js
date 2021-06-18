import React, { useContext, useState, useEffect, useRef } from "react";
import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";
import MemberCard from "./MemberCard/MemberCard.js";
import * as api from "../../../api/group";
import { useMobile } from "../../../utils/responsiveQuery.js";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import COLOR from "../../../constants/colors.js";

function GroupMember() {
  const user = JSON.parse(localStorage.getItem("user"))?.result;
  const { group } = useContext(GroupContext);
  const [listMembers, setListMembers] = useState([]);
  const isMobile = useMobile();
  const [txtSearch, setTxtSearch] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    api
      .getListMembers(group?._id)
      .then((res) => {
        if (res.data instanceof Array) setListMembers(res.data);
        else setListMembers([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [group]);

  let listFilter = listMembers.filter((user) =>
    user.userId.name.toLowerCase().includes(txtSearch.toLowerCase())
  );

  const listMembersCard = () =>
    listFilter?.map((user, i) => (
      <MemberCard
        _id={user.userId._id}
        name={user.userId.name}
        role={user.role}
        relationship="Add Friend"
      ></MemberCard>
    ));

  const isJoinedGroup = () => {
    let isJoined = false;
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?._id) {
        isJoined = true;
      }
    });

    return isJoined;
  };

  const isPublicGroup = () => {
    let isPublicGroup = false;
    if (group?.privacy === "Public") isPublicGroup = true;

    return isPublicGroup;
  };

  const handleSearch = () => {
    setTxtSearch(inputRef.current.state.value);
  };

  return (
    <div>
      <div
        className="row"
        style={{
          marginTop: 30,

          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        <Input
          onPressEnter={handleSearch}
          allowClear
          suffix={
            <SearchOutlined
              onClick={handleSearch}
              style={{ fontSize: 24, color: COLOR.white }}
            />
          }
          ref={inputRef}
          bordered={false}
          style={{
            backgroundColor: COLOR.lightGreen,
          }}
          defaultValue={""}
        />
      </div>
      <div
        className="row"
        style={{
          paddingTop: 16,
          marginTop: 30,
        }}
      >
        {isJoinedGroup() || isPublicGroup() ? (
          <div className={`${!isMobile && "col-12"}`}>{listMembersCard()}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default GroupMember;
