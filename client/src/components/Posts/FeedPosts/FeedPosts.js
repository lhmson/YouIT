import React, { useState } from "react";
import { Row, Col, Layout } from "antd";
import Loading from "../../Loading/Loading";
import styles from "./styles";

import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { useSelector } from "react-redux";

import FeedPost from "./FeedPost/FeedPost";

const { Content } = Layout;

function FeedPosts({ setCurrentId }) {
  // const posts = useSelector((state) => state.posts);
  const [posts, setPosts] = useState(["test", "test", "test"]);

  const fetchMorePosts = () => {
    setTimeout(() => {
      setPosts((prevState) => [...prevState, "test"]);
      setIsFetching(false);
    }, 2000);
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
          {isFetching && (
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
