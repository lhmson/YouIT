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
import * as postsApi from "../../api/post";
import * as commentsApi from "../../api/comments";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

function SpecificPost(props) {
  const { id } = props.match.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [otherPosts, setOtherPosts] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await postsApi.fetchAPost(id);
      setPost(data);
    };
    const fetchOtherPosts = async () => {
      const { data } = await postsApi.fetchOtherPosts(id);
      setOtherPosts(data);
    };
    const fetchComments = async () => {
      const { data } = await commentsApi.fetchComments(id);
      setComments(data);
    };
    fetchPost();
    fetchOtherPosts();
    fetchComments();
  }, []);

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
              <FullPost post={post} comments={comments} />
            </div>
          </Content>
          <FixedRightPanel>
            <RelatedCard title="From this user" posts={otherPosts} />
            <RelatedCard title="Related posts" posts={otherPosts} />
          </FixedRightPanel>
        </Layout>
      </Layout>
    </>
  );
}

export default SpecificPost;