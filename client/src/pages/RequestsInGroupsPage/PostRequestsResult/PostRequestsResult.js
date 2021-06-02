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

const PostRequestsResult = () => {
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
          <PostRequests></PostRequests>
          <PostRequests></PostRequests>
          <PostRequests></PostRequests>
        </div>
      </div>
    </div>
  );
};

export default PostRequestsResult;
