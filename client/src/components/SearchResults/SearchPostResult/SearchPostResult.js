import React, { useState, useEffect, useMemo } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";
import FeedPost from "../../Posts/FeedPosts/FeedPost/FeedPost";
import * as api from "../../../api/search";

const { Content } = Layout;
const { Title, Text } = Typography;

const SearchPostResult = ({ txtSearch }) => {
  const [listPost, setListPost] = useState([]);
  useEffect(() => {
    api
      .fetchSearchPost(txtSearch)
      .then((res) => {
        console.log("LISTALLPOSTS", txtSearch);
        console.log(res.data);
        setListPost(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [txtSearch]);

  const listPostCard = useMemo(
    () =>
      listPost?.map((post, i) => {
        return <FeedPost post={post}></FeedPost>;
      }),
    [listPost]
  );

  return (
    <div className="col-10 offset-1">
      <div
        className="row"
        style={{
          height: 900,
          paddingTop: 16,
          paddingLeft: 32,
          marginLeft: 128,
        }}
      >
        <div className="col-10 offset-1">{listPostCard}</div>
      </div>
    </div>
  );
};

export default SearchPostResult;
