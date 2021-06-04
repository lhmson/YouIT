import React, { useContext, useState, useEffect } from "react";
import { GroupContext } from "../../GroupPage/GroupPage";
import MemberRequests from "../../../components/MemberRequests/MemberRequests";
import * as api from "../../../api/group";

function MemberRequestsResult() {
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
  }, [group]);

  const listMembersRequestCard = () =>
    listMembersRequest?.map((user, i) => (
      <MemberRequests
        _id={user.userId._id}
        name={user.userId.name}
      ></MemberRequests>
    ));

  return (
    <div className="col-10 offset-1">
      <div
        className="row"
        style={{
          height: 900,
          paddingTop: 16,
        }}
      >
        <div className="col-10 offset-1">
          {/* <Text style={{ fontSize: 32, fontWeight: "bold" }}>Member</Text> */}
          {listMembersRequestCard()}
        </div>
      </div>
    </div>
  );
}

export default MemberRequestsResult;
