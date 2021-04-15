import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.js";
import { Layout, Typography, Breadcrumb } from "antd";

import Navbar from "../../components/Navbar/Navbar";
import { getPosts } from "../../redux/actions/posts.js";
import FullPost from "../../components/Posts/Post/FullPost.js";
import { useLocation } from "react-router";

const { Content } = Layout;
const { Title, Text } = Typography;

function SpecificPost(props) {
  const { match, history } = props;
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("abc");
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Navbar selectedMenu="home" />
        <Layout>
          <FullPost id="6077cf31466ee01ebc305055" />
        </Layout>
      </Layout>
    </>
  );
}

export default SpecificPost;
