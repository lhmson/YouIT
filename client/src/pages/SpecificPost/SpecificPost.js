import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.js";
import {
  Layout,
  Typography,
  Breadcrumb,
  Menu,
  Affix,
  Button,
  Row,
  Col,
  Card,
  Tag,
  Space,
} from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import Navbar from "../../components/Navbar/Navbar";
import { getPosts } from "../../redux/actions/posts.js";
import FullPost from "../../components/Posts/FullPost/FullPost.js";
import FeedSidebar from "../../components/Sidebar/FeedSidebar/FeedSidebar.js";
import Loading from "../../components/Loading/Loading.js";
import COLOR from "../../constants/colors.js";
import { PresetColorTypes } from "antd/lib/_util/colors";
import RelatedCard from "../../components/RelatedCard/RelatedCard.js";
import FixedRightPanel from "../../components/FixedRightPanel/FixedRightPanel.js";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

function SpecificPost(props) {
  const { match, history } = props;
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
      <Layout>
        <Navbar selectedMenu="test" />

        <Layout style={styles.mainArea}>
          <Content>
            <div className="mr-4  ">
              <FullPost />
            </div>
          </Content>
          <FixedRightPanel>
            <RelatedCard title="From this user" />
            <RelatedCard title="Related posts" />
          </FixedRightPanel>
        </Layout>
      </Layout>
    </>
  );
}

export default SpecificPost;
