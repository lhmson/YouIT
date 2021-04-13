import React from "react";
import { Card, Avatar, Button, Typography } from "antd";
import { LikeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../redux/actions/posts";

const { Meta } = Card;
const { Title, Text } = Typography;

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    setCurrentId(post._id);
  };

  const handleLike = () => {
    dispatch(likePost(post._id));
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <div>
      <Card
        cover={
          <img
            alt={post.title}
            src={
              post.selectedFile ||
              "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            }
          />
        }
        hoverable
        extra={
          <>
            <span>Post from </span>
            <a href="#">{post.creator}</a> {moment(post.createdAt).fromNow()}
          </>
        }
        actions={[
          <EditOutlined key="edit" onClick={handleEdit} />,
          <>
            <LikeOutlined key="like" onClick={handleLike} />
            <Text>{post.likeCount}</Text>
          </>,
          <DeleteOutlined key="del" onClick={handleDelete} />,
        ]}
        style={{ background: "transparent" }}
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={post.title}
          description={post.message}
        />
      </Card>
    </div>
  );
}

export default Post;
