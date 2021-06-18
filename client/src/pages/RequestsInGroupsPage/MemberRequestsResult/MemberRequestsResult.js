import React, { useContext, useState, useEffect } from "react";
import { GroupContext } from "../../GroupPage/GroupPage";
import MemberRequests from "../../../components/MemberRequests/MemberRequests";
import * as api from "../../../api/group";
import COLOR from "../../../constants/colors";
import { Typography, Row } from "antd";
import styles from "./styles.js";

const { Text } = Typography;

function MemberRequestsResult(props) {
  const { group } = useContext(GroupContext);
  const [listMembersRequest, setListMembersRequest] = useState([]);
  // const [user] = useLocalStorage("user");
  // const { listPendingMembers } = group;
  useEffect(() => {
    api
      .getListPendingMembers(group?._id)
      .then((res) => {
        if (res.data instanceof Array) setListMembersRequest(res.data);
        else setListMembersRequest([]);
      })
      .catch((e) => {
        console.log(e);
      });

    console.log("thyyy", listMembersRequest.forEach);
  }, [group]);

  const listMembersRequestCard = () =>
    listMembersRequest?.map((user, i) => (
      <MemberRequests
        _id={user.userId._id}
        name={user.userId.name}
      ></MemberRequests>
    ));

  const noRequestPending = () => (
    <div style={styles.item}>
      <Row className="pb-2 justify-content-between align-items-center">
        <Text style={{ fontSize: 24 }}>No member request pending.</Text>
      </Row>
    </div>
  );

  return (
    <div
      style={{
        background: COLOR.whiteSmoke,
      }}
    >
      <div className="col-10 offset-1">
        <div
          className="row"
          style={{
            height: 900,
            paddingTop: 16,
          }}
        >
          <div className="col-10 offset-1">
            {listMembersRequest.length === 0
              ? noRequestPending()
              : listMembersRequestCard()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberRequestsResult;
