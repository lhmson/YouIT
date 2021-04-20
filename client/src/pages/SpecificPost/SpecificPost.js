import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.js";
import { Layout, Typography, Breadcrumb } from "antd";

import Navbar from "../../components/Navbar/Navbar";
import { getPosts } from "../../redux/actions/posts.js";
import FullPost from "../../components/Posts/Post/FullPost.js";

const { Content } = Layout;

function SpecificPost(props) {
  const { match, history } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <>
      <Layout>
        <Navbar selectedMenu="test" />
        <Layout style={styles.mainArea}>
          <FullPost id={match.params.id} />
        </Layout>
      </Layout>
    </>
  );
}

export default SpecificPost;
