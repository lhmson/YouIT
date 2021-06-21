import React, { useState, useEffect, useMemo } from "react";
import { Typography } from "antd";
import FeedPost from "../../Posts/FeedPosts/FeedPost/FeedPost";
import * as api from "../../../api/search";
import NoDataSearch from "../../../components/NoDataSearch/NoDataSearch";
import { useMobile } from "../../../utils/responsiveQuery.js";
import LoadingSearch from "../../../components/Loading/LoadingSearch.js";

const SearchPostResult = ({ txtSearch }) => {
  const [listPost, setListPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const isMobile = useMobile();

  useEffect(() => {
    setLoading(false);
    api
      .fetchSearchPost(txtSearch)
      .then((res) => {
        // console.log("LISTALLPOSTS", txtSearch);
        // console.log(res.data);
        if (res.data instanceof Array) setListPost(res.data);
        else setListPost([]);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [txtSearch]);

  const listPostCard = useMemo(
    () =>
      listPost?.map((post, i) => {
        return <FeedPost key={post._id} post={post}></FeedPost>;
      }),
    [listPost]
  );

  
  if (!loading)
    return (
      <div
        className="row justify-content-center"
        style={{
          paddingTop: 16,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        <div className={`${!isMobile && "col-12"}`}>
          <LoadingSearch></LoadingSearch>
        </div>
      </div>
    );
    
  return (
    // <div className="col-12">
    <div
      className="row justify-content-center"
      style={{
        paddingTop: 16,
        paddingLeft: 32,
        paddingRight: 32,
      }}
    >
      <div className={`${!isMobile && "col-12"}`}>
        {listPostCard.length === 0 ? (
          <NoDataSearch></NoDataSearch>
        ) : (
          listPostCard
        )}
      </div>
    </div>
    // </div>
  );
};

export default SearchPostResult;
