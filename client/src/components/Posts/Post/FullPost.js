import React from "react";
import { Row, Col } from "antd";
import Loading from "../../Loading/Loading";
import styles from "./styles";

import { useSelector } from "react-redux";

function FullPost({ id }) {
  const posts = useSelector((state) => state.posts);
  console.log("posts specific", posts);
  const post = posts.find((item) => item._id === id);

  return <div>{post.title}</div>;
}

export default FullPost;
