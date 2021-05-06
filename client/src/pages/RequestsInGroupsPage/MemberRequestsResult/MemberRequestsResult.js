import React, { useState, useEffect } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { getPosts } from "../../../redux/actions/posts";
import MemberRequest from "../../../components/MemberRequest/MemberRequest";
import MemberRequests from "../../../components/MemberRequests/MemberRequests";
import PostRequests from "../../../components/PostRequests/PostRequests";

const { Content } = Layout;
const { Title, Text } = Typography;

const MemberRequestsResult = () => {
  return (
    <div className="col-10 offset-1">
      <div
        className="row"
        style={{
          background: "whitesmoke",
          height: 900,
          paddingTop: 16,
          paddingLeft: 32,
          marginLeft: 128,
        }}
      >
        <div className="col-10 offset-1">
          <MemberRequests></MemberRequests>
          <MemberRequests></MemberRequests>
          <MemberRequests></MemberRequests>
        </div>
      </div>
    </div>
  );
};

export default MemberRequestsResult;
