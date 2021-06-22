import React, { useContext, useState, useEffect } from "react";
import { GroupContext } from "../../GroupPage/GroupPage";
import MemberRequests from "../../../components/MemberRequests/MemberRequests";
import * as api from "../../../api/group";
import COLOR from "../../../constants/colors";
import { Typography, Row } from "antd";
import { useHistory } from "react-router-dom";
import { Loading } from "../../../components";
import styles from "./styles.js";

const { Text } = Typography;

function MemberRequestsResult() {
  const { group } = useContext(GroupContext);
  const [listMembersRequest, setListMembersRequest] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"))?.result;
  const history = useHistory();

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
  }, [group]);

  useEffect(() => {
    if (!isAdmin()) history.push(`/group/${group?._id}/main`);
  }, []);

  const listMembersRequestCard = () =>
    listMembersRequest?.map((user, i) => (
      <MemberRequests
        _id={user.userId._id}
        name={user.userId.name}
        avatarUrl={user.userId.avatarUrl}
      ></MemberRequests>
    ));

  const noRequestPending = () => (
    <div style={styles.item}>
      <Row className="pb-2 justify-content-between align-items-center">
        <Text style={{ fontSize: 24 }}>No member request pending.</Text>
      </Row>
    </div>
  );

  const isAdmin = () => {
    let isJoined = false;
    group?.listMembers.forEach((member) => {
      if (
        member?.userId === user?._id &&
        (member?.role === "Member" || member?.role === "Owner")
      ) {
        isJoined = true;
      }
    });

    return isJoined;
  };

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
            {!listMembersRequest.length ? (
              <div className="text-center">
                <Loading />
              </div>
            ) : listMembersRequest.length === 0 ? (
              noRequestPending()
            ) : (
              listMembersRequestCard()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberRequestsResult;
