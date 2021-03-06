import React, { useState, useEffect, useCallback } from "react";
import { Row, Typography } from "antd";
import Loading from "../../Loading/Loading";
import styles from "./styles";

import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

import InfiniteScroll from "react-infinite-scroll-component";

import { useHistory } from "react-router-dom";

import * as api from "../../../api/post";

import FeedPost from "./FeedPost/FeedPost";

const { Text } = Typography;

function FeedPosts({
  setCurrentId,
  limitPagination = 5,
  space,
  ownerId,
  groupId,
  hasMarginLeft,
}) {
  // const posts = useSelector((state) => state.posts);
  const [posts, setPosts] = useState([]);

  //setting the initial page
  const [page, setPage] = useState(0);
  //we need to know if there is more data
  const [hasMore, setHasMore] = useState(true);

  const history = useHistory();

  const handleFetchPosts = useCallback((res) => {
    setPosts((prev) => {
      return [...new Set([...prev, ...res.data.map((b) => b)])];
    });
    setPage((prevPageNumber) => prevPageNumber + 1);
    setHasMore(res.data.length !== 0);
    // setIsFetching(false);
  }, []);

  useEffect(() => {
    console.log("feed posts info", limitPagination, space, ownerId, groupId);
    api
      .fetchPostsPagination(0, limitPagination, space, ownerId, groupId) // very good
      .then((res) => {
        handleFetchPosts(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const fetchMorePosts = () => {
    // setTimeout(() => {
    //   setPosts((prevState) => [...prevState, "test"]);
    //   setIsFetching(false);
    // }, 2000);
    if (hasMore) {
      api
        .fetchPostsPagination(page, limitPagination, space, ownerId, groupId)
        .then((res) => {
          handleFetchPosts(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchMorePosts);

  return (
    <div>
      {!posts.length ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : (
        <div>
          <InfiniteScroll
            dataLength={posts.length}
            next={() => fetchMorePosts()}
            hasMore={hasMore}
            loader={<Loading />}
            scrollableTarget="scrollableDiv"
            endMessage={
              <p
                style={{ textAlign: "center", fontSize: "1rem" }}
                className="clickable"
                onClick={() => history.push("/post/create")}
              >
                <b>You have reached all posts. Let's share your own, right?</b>
              </p>
            }
          >
            <Row
              style={
                hasMarginLeft
                  ? { ...styles.postsBox, padding: "24px 24px 0" }
                  : styles.postsBox
              }
            >
              {posts?.map((post) => (
                <FeedPost
                  key={post._id}
                  post={post}
                  setCurrentId={setCurrentId}
                />
              ))}
            </Row>
          </InfiniteScroll>
          {/* {isFetching && hasMore && <Loading />} */}
        </div>
      )}
    </div>
  );
}

export default FeedPosts;
