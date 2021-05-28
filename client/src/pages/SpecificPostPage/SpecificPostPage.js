import React, { useState, useEffect } from "react";
import styles from "./styles.js";
import { Layout, Typography, Menu, Card, Row, Dropdown, message } from "antd";
import { DownOutlined, FieldTimeOutlined } from "@ant-design/icons";

import Navbar from "../../components/Navbar/Navbar";
import FullPost from "../../components/Posts/FullPost/FullPost.js";
import RelatedCard from "../../components/RelatedCard/RelatedCard.js";
import FixedRightPanel from "../../components/FixedRightPanel/FixedRightPanel.js";
import * as postsApi from "../../api/post";
import * as commentsApi from "../../api/comment";
import CommentForm from "../../components/CommentForm/CommentForm.js";
import Comment from "../../components/Comment/Comment.js";
import COLOR from "../../constants/colors.js";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading.js";

const { Content } = Layout;
const { Title, Text } = Typography;

function SpecificPostPage(props) {
  const history = useHistory();

  const sorts = [
    {
      type: "new",
      name: "Newest",
      icon: <FieldTimeOutlined />,
      function: sortByUpdatedTime,
    },
  ];

  const { id, commentId } = props.match.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  const [sort, setSort] = useState(sorts[0]);
  const [focusedCommentIndex, setFocusedCommentIndex] = useState(-1);

  const fetchPost = async () => {
    postsApi
      .fetchAPost(id)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) history.push("/error404");
      });
  };

  const fetchOtherPosts = async () => {
    const { data } = await postsApi.fetchOtherPosts(id);
    setOtherPosts(data);
  };

  const fetchComments = async () => {
    const { data } = await commentsApi.fetchComments(id);
    const sortedData = sort?.function(data);
    if (commentId) {
      const i = sortedData.findIndex((c) => c._id === commentId);
      if (i > -1) {
        const temp = sortedData[0];
        sortedData[0] = sortedData[i];
        sortedData[i] = temp;
      } else {
        history.push(`/post/${post?._id}`);
      }
      setFocusedCommentIndex(i);
    }
    setComments(sortedData);
  };

  useEffect(() => {
    fetchPost();
    fetchOtherPosts();
    fetchComments();
  }, []);

  function sortByUpdatedTime(data) {
    const sortedData = data?.sort(function (a, b) {
      var atime = a.updatedAt;
      var btime = b.updatedAt;
      if (atime > btime) return -1;
      if (atime < btime) return 1;
      return 0;
    });
    return sortedData;
  }

  const handleSubmitComment = async (newComment) => {
    await commentsApi.createComment(post._id, newComment);

    if (commentId) {
      history.push(`/post/${post?._id}`);
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
    switch (key) {
      case "0":
        setSort(sorts[0]);
        break;
      default:
        setSort(sorts[0]);
    }
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
      .writeText(`localhost:3000/post/${post?._id}/${id}`) // change to deployment link later
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
        <Layout style={styles.mainArea}>
          <Content>
            <div className="mr-4">
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
                  <Dropdown overlay={sortMenu}>
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
                  {comments?.map((c, i) =>
                    focusedCommentIndex > -1 && i === 0 ? (
                      <div key={i}>
                        <Comment
                          comment={c}
                          onReply={handleReplyComment}
                          onEdit={handleEditComment}
                          onDelete={handleDeleteComment}
                          onCopyCommentLink={handleCopyCommentLink}
                          isFocus={true}
                        />
                      </div>
                    ) : (
                      <div key={i}>
                        <Comment
                          comment={c}
                          onReply={handleReplyComment}
                          onEdit={handleEditComment}
                          onDelete={handleDeleteComment}
                          onCopyCommentLink={handleCopyCommentLink}
                          isFocus={false}
                        />
                      </div>
                    )
                  )}
                </div>
              </Card>
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

export default SpecificPostPage;
