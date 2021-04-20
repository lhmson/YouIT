import React from "react";
import { Row, Col, Layout } from "antd";
import Loading from "../../Loading/Loading";
import styles from "./styles";

import { useSelector } from "react-redux";

import FeedPost from "./FeedPost/FeedPost";

const { Content } = Layout;

function FeedPosts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts);

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
        </>
      )}
    </Content>
  );
}

export default FeedPosts;
