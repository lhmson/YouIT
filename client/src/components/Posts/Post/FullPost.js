import React, { useEffect } from "react";
import { Row, Col } from "antd";
import Loading from "../../Loading/Loading";
import styles from "./styles";

import { useSelector } from "react-redux";

function FullPost({ id }) {
  const posts = useSelector((state) => state.posts);

  const post = posts.find((item) => item._id === id);

  useEffect(() => {
    console.log("full ", posts);
  }, [posts]);

  return <div>{post?.title}</div>;
}

export default FullPost;
