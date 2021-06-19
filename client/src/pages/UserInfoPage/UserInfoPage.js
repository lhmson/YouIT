import React, { useEffect } from "react";
import { Col, Layout, Row } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";
import {
  AvatarView,
  ListButtons,
  IntroCard,
  FeedPosts,
} from "../../components/index";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUser } from "../../redux/actions/user.js";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const { Content } = Layout;

function UserInfoPage() {
  let { id } = useParams();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(getUser(id, history));
    // setTimeout(() => {
    //   if (!user) history.push("/error404");
    // }, 2000);
  }, [id]);

  useEffect(() => {
    if (!user || user?._id != id) return <Loading />;
  }, [user]);
  if (!user || user?._id != id) return <Loading />;

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
          <Content className="container">
            <Row>
              <div className="col-md-4">
                <IntroCard />
              </div>
              <div className="col-md-8">
                <FeedPosts
                  space="user_profile"
                  limitPagination={5}
                  ownerId={id}
                />
              </div>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default UserInfoPage;
