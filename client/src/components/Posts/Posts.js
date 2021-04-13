import React from "react";
import { Row, Col } from "antd";
import Loading from "../Loading/Loading";
import styles from "./styles";

import { useSelector } from "react-redux";

import Post from "./Post/Post";

function Posts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts);

  return (
    <div>
      {!posts.length ? (
        <Loading />
      ) : (
        <>
          <Row style={styles.gutterBox} gutter={[16, 24]}>
            {posts.map((post) => (
              <Col
                style={styles.post}
                key={post._id}
                className="gutter-row"
                span={6}
              >
                <Post post={post} setCurrentId={setCurrentId} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}

export default Posts;
