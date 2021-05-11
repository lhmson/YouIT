import React, { useState, useEffect } from "react";
import styles from "./styles.js";
import { Layout, Typography, Menu, Card } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import { getPosts } from "../../redux/actions/posts.js";
import FullPost from "../../components/Posts/FullPost/FullPost.js";
import RelatedCard from "../../components/RelatedCard/RelatedCard.js";
import FixedRightPanel from "../../components/FixedRightPanel/FixedRightPanel.js";
import * as postsApi from "../../api/post";
import * as commentsApi from "../../api/comment";
import CommentForm from "../../components/CommentForm/CommentForm.js";
import Comment from "../../components/Comment/Comment.js";

const { Content } = Layout;
const { Title } = Typography;

function SpecificPost(props) {
  const { id } = props.match.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [otherPosts, setOtherPosts] = useState(null);
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

  useEffect(() => {
    fetchPost();
    fetchOtherPosts();
    fetchComments();
  }, []);

  const handleSubmitComment = async (newComment) => {
    await commentsApi.createComment(post._id, newComment);
    fetchComments();
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

  return (
    <>
      <Layout>
        <Navbar />
        <Layout style={styles.mainArea}>
          <Content>
            <div className="mr-4  ">
              <Card style={{ padding: 16 }}>
                <FullPost post={post} />
                <CommentForm
                  onSubmit={handleSubmitComment}
                  label="Comment to this post"
                />

                <Title className="mb-4" level={2}>
                  {`Comments (${comments?.length})`}
                </Title>
                {comments?.map((c) => (
                  <Comment
                    comment={c}
                    onReply={handleReplyComment}
                    onEdit={handleEditComment}
                    onDelete={handleDeleteComment}
                  />
                ))}
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

export default SpecificPost;