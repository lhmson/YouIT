import React from "react";
import { Card, Avatar, Button, Typography } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../redux/actions/posts";

const { Meta } = Card;
const { Title, Text } = Typography;

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleEdit = () => {
    setCurrentId(post._id);
  };

  const handleLike = () => {
    // dispatch(likePost(post._id));
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
            {post.createdAt !== post.updatedAt && (
              <p>Update {moment(post.updatedAt).fromNow()}</p>
            )}
          </>
        }
        actions={[
          <>
            {(user?.result?.googleId === post?.creatorId ||
              user?.result?._id === post?.creatorId) && (
              <EditOutlined key="edit" onClick={handleEdit} />
            )}
          </>,
          <>
            {(user?.result?.googleId === post?.creatorId ||
              user?.result?._id === post?.creatorId) && (
              <DeleteOutlined key="del" onClick={handleDelete} />
            )}
          </>,
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
