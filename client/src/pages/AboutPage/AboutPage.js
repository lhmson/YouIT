import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/user.js";

import { Layout, Row, Typography, Col } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import {
  AboutCard,
  AvatarView,
  ListButtons,
  FriendManager,
} from "../../components/index";
import { useParams } from "react-router";

const { Content } = Layout;

function AboutPage() {
  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(async () => {
    //console.log("start fetching user");
    dispatch(getUser(id));
  }, []);

  return (
    <>
      <Layout>
        <Navbar />
        <Layout style={styles.avatarView}>
          <Content
            className="container"
            style={{
              padding: 8,
            }}
          >
            <AvatarView></AvatarView>
            <ListButtons />
          </Content>
        </Layout>
        <Layout style={styles.mainArea}>
          <Content
            className="container"
            style={{
              padding: 16,
            }}
          >
            <AboutCard></AboutCard>
            <FriendManager></FriendManager>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AboutPage;
