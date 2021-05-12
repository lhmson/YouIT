import React, { useState, useEffect } from "react";
import { Row, Layout } from "antd";
import Loading from "../../Loading/Loading";
import styles from "./styles";

import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

import * as api from "../../../api/post";

import FeedPost from "./FeedPost/FeedPost";

const { Content } = Layout;

function FeedPosts({ setCurrentId }) {
  // const posts = useSelector((state) => state.posts);
  const [posts, setPosts] = useState([]);

  //setting the initial page
  const [page, setPage] = useState(0);
  //we need to know if there is more data
  const [hasMore, setHasMore] = useState(true);

  const handleFetchPosts = (res) => {
    setPosts((prev) => {
      return [...new Set([...prev, ...res.data.map((b) => b)])];
    });
    setPage((prevPageNumber) => prevPageNumber + 1);
    setHasMore(res.data.length !== 0);
    setIsFetching(false);
  };

  useEffect(() => {
    api
      .fetchPostsPagination(0, 2)
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
        .fetchPostsPagination(page, 2)
        .then((res) => {
          handleFetchPosts(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMorePosts);

  return (
    <Content>
      {!posts.length ? (
        <Loading />
      ) : (
        <>
          <Row style={styles.postsBox}>
            {posts.map((post) => (
              <FeedPost
                key={post._id}
                post={post}
                setCurrentId={setCurrentId}
              />
            ))}
          </Row>
          {isFetching && hasMore && (
            <div className="d-flex justify-content-center pb-2">
              <Loading />
            </div>
          )}
        </>
      )}
    </Content>
  );
}

export default FeedPosts;
