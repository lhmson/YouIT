import React, { useState, useEffect } from "react";
import styles from "./styles.js";
import { Layout, Typography, Menu, Card, Row, Dropdown, message } from "antd";
import {
  DownOutlined,
  FieldTimeOutlined,
  StarOutlined,
} from "@ant-design/icons";

import Navbar from "../../components/Navbar/Navbar";
import FullPost from "../../components/Posts/FullPost/FullPost.js";
import RelatedCard from "../../components/RelatedCard/RelatedCard.js";
import * as postsApi from "../../api/post";
import * as commentsApi from "../../api/comment";
import CommentForm from "../../components/CommentForm/CommentForm.js";
import Comment from "../../components/Comment/Comment.js";
import COLOR from "../../constants/colors.js";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading.js";
import { FRONTEND_URL } from "../../constants/config.js";

const { Title, Text } = Typography;

function SpecificPostPage(props) {
  const history = useHistory();

  const sorts = [
    {
      type: "new",
      name: "Newest comments first",
      icon: <FieldTimeOutlined />,
      function: sortByTime,
    },
    {
      type: "hot",
      name: "Top comments first",
      icon: <StarOutlined />,
      function: sortByInteraction,
    },
  ];

  const { id, focusedCommentId } = props.match.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  const [sort, setSort] = useState(sorts[0]);
  const [focusedCommentIndex, setFocusedCommentIndex] = useState(-1);

  const fetchPageContent = () => {
    fetchPost();
    fetchOtherPosts();
    fetchComments();
  };
  useEffect(() => {
    fetchPageContent();
  }, [id]);
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [sort]);

  const fetchPost = async () => {
    postsApi
      .fetchAPost(id)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        switch (err.response?.status) {
          case 404:
            history.push("/error404");
            break;
          case 403:
            history.push("/error403");
            break;
          default:
            history.push("/error404");
        }
      });
  };

  const fetchOtherPosts = async () => {
    const { data } = await postsApi.fetchOtherPosts(id);
    setOtherPosts(data);
  };

  const fetchComments = async () => {
    const { data } = await commentsApi.fetchComments(id);
    const sortedData = sort?.function(data);
    if (focusedCommentId) {
      const i = sortedData.findIndex((c) => c._id === focusedCommentId);
      console.log(i);
      if (i > -1) {
        const temp = sortedData[0];
        sortedData[0] = sortedData[i];
        sortedData[i] = temp;
      } else {
        history.push(`/post/${id}`);
      }
      setFocusedCommentIndex(i);
    }

    setComments(sortedData);
  };

  useEffect(() => {
    fetchPageContent();
  }, []);

  function sortByTime(data) {
    const sortedData = data?.sort(function (a, b) {
      var _a = a.createdAt;
      var _b = b.createdAt;
      if (_a > _b) return -1;
      if (_a < _b) return 1;
      return 0;
    });
    return sortedData;
  }

  function sortByInteraction(data) {
    const sortedData = data?.sort(function (a, b) {
      var _a = a.interactionInfo?.listUpvotes?.length;
      var _b = b.interactionInfo?.listUpvotes?.length;
      if (_a > _b) return -1;
      if (_a < _b) return 1;
      if (_a === _b) {
        var c = a.interactionInfo?.listDownvotes?.length;
        var d = b.interactionInfo?.listDownvotes?.length;
        if (c < d) return -1;
        if (c > d) return 1;
      }
      return 0;
    });
    return sortedData;
  }

  const handleSubmitComment = async (newComment) => {
    await commentsApi.createComment(post._id, newComment);

    if (focusedCommentId) {
      history.push(`/post/${id}`);
      history.go(0);
    } else fetchComments();
  };

  const handleReplyComment = async (commentId, inputComment) => {
    await commentsApi.replyComment(post._id, commentId, inputComment);
    fetchComments();
  };

  const handleEditComment = async (commentId, newComment) => {
    await commentsApi.editComment(commentId, newComment);
    fetchComments();
  };

  const handleDeleteComment = async (commentId) => {
    await commentsApi.deleteComment(commentId);
    fetchComments();
  };

  const handleSortMenuClick = ({ key }) => {
    setSort(sorts[key]);
  };

  const sortMenu = (
    <Menu onClick={handleSortMenuClick}>
      {sorts.map((s, index) => {
        return (
          <Menu.Item key={index}>
            <Row align="middle">
              {s.icon}
              <Text className="ml-2">{s.name}</Text>
            </Row>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const handleCopyCommentLink = (id) => {
    navigator.clipboard
      .writeText(`${FRONTEND_URL}/post/${post?._id}/${id}`) // change to deployment link later
      .then(() => message.success("Link copied to clipboard"))
      .catch((error) => {
        message.error("Something goes wrong copying link");
        // console.log(id);
      });
  };

  return (
    <>
      <Layout>
        <Navbar />
        <div style={styles.mainArea} className="row">
          <div className="col-md-8 mb-4">
            <div>
              <Card style={{ padding: 16 }}>
                {post ? <FullPost post={post} /> : <Loading />}
                {/* put there for anchor link to comments */}
                <div id="comments"></div>
                <CommentForm
                  onSubmit={handleSubmitComment}
                  label="Comment to this post"
                />
                <Row justify="space-between" align="middle">
                  <Title className="mb-4" level={2}>
                    {`Comments (${comments?.length})`}
                  </Title>
                  <Dropdown overlay={sortMenu} className="clickable">
                    <Row
                      align="middle"
                      style={{
                        backgroundColor: COLOR.whiteSmoke,
                        padding: 8,
                        paddingLeft: 12,
                        paddingRight: 12,
                      }}
                    >
                      {sort?.icon}
                      <Text className="ml-2 mr-2">{sort?.name}</Text>
                      <DownOutlined />
                    </Row>
                  </Dropdown>
                </Row>
                {/* test anchor link for comment but not work */}
                <div style={{ margin: -20, marginTop: 0 }}>
                  {comments?.map((c, i) => (
                    <div key={i}>
                      <Comment
                        comment={c}
                        onReply={handleReplyComment}
                        onEdit={handleEditComment}
                        onDelete={handleDeleteComment}
                        onCopyCommentLink={handleCopyCommentLink}
                        isFocus={focusedCommentIndex > -1 && i === 0}
                        postId={post?._id}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
          <div className="col-md-4">
            <RelatedCard title="From this user" posts={otherPosts} />
            <RelatedCard title="Related posts" posts={otherPosts} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default SpecificPostPage;
