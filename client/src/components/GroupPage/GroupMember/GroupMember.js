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
  const { group } = useContext(GroupContext);

  const [listMembers, setListMembers] = useState([]);
  const [txtSearch, setTxtSearch] = useState("");
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

  const listMembersCard = () =>
    listMembers?.map((user, i) => (
      <MemberCard
        _id={user.userId._id}
        name={user.userId.name}
        role={user.role}
        relationship="Add Friend"
      ></MemberCard>
    ));

  return (
    <div>
      <div
        className="row"
        style={{
          paddingTop: 16,
          marginTop: 30,
        }}
      >
        <Row>{listMembersCard()}</Row>
      </div>
    </div>
  );
}

export default GroupMember;
