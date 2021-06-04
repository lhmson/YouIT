import React, { useState, useEffect, useMemo } from "react";
import { Layout, Typography, Breadcrumb, Row, Col } from "antd";
import styles from "./styles.js";
import FeedPost from "../../Posts/FeedPosts/FeedPost/FeedPost";
import * as api from "../../../api/search";
import NoDataSearch from "../../../components/NoDataSearch/NoDataSearch";

const { Content } = Layout;
const { Title, Text } = Typography;

const SearchPostResult = ({ txtSearch }) => {
  const [listPost, setListPost] = useState([]);
  useEffect(() => {
    api
      .fetchSearchPost(txtSearch)
      .then((res) => {
        // console.log("LISTALLPOSTS", txtSearch);
        // console.log(res.data);
        if (res.data instanceof Array) setListPost(res.data);
        else setListPost([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [txtSearch]);

  const listPostCard = useMemo(
    () =>
      listPost?.map((post, i) => {
        return <FeedPost key={i} post={post}></FeedPost>;
      }),
    [listPost]
  );

  return (
    <div className="col-12">
      <div
        className="row"
        style={{
          paddingTop: 16,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        <div className="col-12">
          {listPostCard.length === 0 ? (
            <NoDataSearch></NoDataSearch>
          ) : (
            listPostCard
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPostResult;
