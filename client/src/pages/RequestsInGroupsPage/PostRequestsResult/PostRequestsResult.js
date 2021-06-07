import React from "react";
import { Layout, Typography } from "antd";
import styles from "./styles.js";

import PostRequests from "../../../components/PostRequests/PostRequests";

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
