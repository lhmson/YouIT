import { Button, Divider, Layout, Row, Typography } from "antd";
import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { IoMdLock } from "react-icons/all";
import COLOR from "../../../constants/colors.js";
import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";
import { OverviewRow } from "../../UserInfo/AboutCard/index.js";
import MemberCard from "./MemberCard/MemberCard.js";
import * as api from "../../../api/group";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import styles from "./styles.js";

const { Text } = Typography;

function GroupMember() {
  const user = JSON.parse(localStorage.getItem("user"))?.result;
  const { group } = useContext(GroupContext);

  const [listMembers, setListMembers] = useState([]);
  const [listName, setListName] = useState([]);
  // const [mode, setMode] = useState("Friends");

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

  useEffect(() => {}, []);

  //   listMembers.sort(function(a, b){
  //     if(a.firstname < b.firstname) { return -1; }
  //     if(a.firstname > b.firstname) { return 1; }
  //     return 0;
  // })

  const listMembersCard = () =>
    listMembers?.map((user, i) => (
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
      if (member?.userId == user?._id) {
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

  return (
    <div>
      <div
        className="row"
        style={{
          paddingTop: 16,
          marginTop: 30,
        }}
      >
        {isJoinedGroup() || isPublicGroup() ? (
          <Row>{listMembersCard()}</Row>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default GroupMember;
