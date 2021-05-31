import React from "react";
import { Layout, Typography } from "antd";

import MemberRequests from "../../../components/MemberRequests/MemberRequests";

const { Content } = Layout;
const { Title, Text } = Typography;

const MemberRequestsResult = () => {
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
          <MemberRequests></MemberRequests>
          <MemberRequests></MemberRequests>
          <MemberRequests></MemberRequests>
        </div>
      </div>
    </div>
  );
};

export default MemberRequestsResult;
