import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Button,
  Typography,
  Row,
  Col,
  Tag,
  Space,
  Input,
  Divider,
  Menu,
  Dropdown,
  message,
} from "antd";
import {
  EllipsisOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LinkOutlined,
  ShareAltOutlined,
  CaretRightOutlined,
  BellOutlined,
  DeleteFilled,
  EditOutlined,
} from "@ant-design/icons";
import styles from "./styles";
import COLOR from "../../constants/colors";
import CommentForm from "../CommentForm/CommentForm";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

function Comment({ comment, onReply, onEdit, onDelete }) {
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleReply = () => {
    setIsReply(1 - isReply);
    console.log("comment", comment);
  };
  const handleSubmit = (newComment) => {
    onReply(comment?._id, newComment);
    setIsReply(false);
  };
  const onMoreSelect = ({ key }) => {
    switch (key) {
      case "0":
        setIsEdit(true);
        break;
      case "1":
        handleDelete();
        break;
      default:
        break;
    }
  };
  const handleDelete = () => {
    onDelete(comment?._id);
  };
  const menuMore = (
    <Menu onClick={onMoreSelect}>
      <Menu.Item key="0">
        <Row align="middle">
          <EditOutlined className="mr-2" />
          <Text>Edit comment</Text>
        </Row>
      </Menu.Item>
      <Menu.Item key="1">
        <Row align="middle">
          <DeleteFilled className="red mr-2" />
          <Text className="red">Delete comment</Text>
        </Row>
      </Menu.Item>
    </Menu>
  );
  const renderEdit = () => {
    const handleDiscard = () => {
      setIsEdit(false);
    };
    return (
      <CommentForm
        label="Edit comment"
        onSubmit={handleEdit}
        onDiscard={handleDiscard}
      />
    );
  };
  const handleEdit = (newComment) => {
    setIsEdit(false);
    onEdit(comment?._id, newComment);
  };
  const handleDiscardReply = () => {
    setIsReply(false);
  };

  return (
    <div>
      <Row
        className="pb-2"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Row className="align-items-center" style={{ marginBottom: 12 }}>
          <Avatar
            className="ml-1 clickable"
            size={45}
            src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-1/p240x240/167274298_2791941774405213_2973980969027075470_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=QpKEyCIKuj0AX8HRcN6&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=96abb4f8e352f1223ecf465f760a78e8&oe=60A5BF59"
          />
          <div className="d-inline-flex flex-column ml-3">
            <Row style={{ alignItems: "center" }}>
              <Space size={4}>
                <Text
                  className="clickable"
                  strong
                  style={{ fontSize: "1.2rem" }}
                >
                  {comment?.userId?.name}
                </Text>
              </Space>
            </Row>
            <Text>Fullstack Developer</Text>
          </div>
        </Row>
        <Row className="justify-content-end align-items-center pb-3">
          <div className="mr-4">
            <Text className="clickable" underline type="secondary">
              Last edited {comment?.updatedAt.toString().slice(0, 10)}
            </Text>
          </div>
          <Dropdown
            overlay={menuMore}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div className="clickable">
              <EllipsisOutlined className="clickable icon" />
            </div>
          </Dropdown>
        </Row>
      </Row>
      {!isEdit ? (
        <div>
          {comment?.quotedCommentId !== undefined ? (
            <div
              className="p-3 mb-3"
              style={{ backgroundColor: COLOR.whiteSmoke }}
            >
              <Row
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {comment?.quotedCommentId === null ? (
                  <Text className="italic">Deleted comment</Text>
                ) : (
                  <Text className="black bold clickable">{`${comment?.quotedCommentId?.userId?.name}'s comment`}</Text>
                )}
                <Text className="clickable" underline type="secondary">
                  Last edited{" "}
                  {comment?.quotedCommentId?.updatedAt?.toString().slice(0, 10)}
                </Text>
              </Row>
              <Paragraph style={{ color: COLOR.gray, marginBottom: 0 }}>
                {comment?.quotedCommentId?.content}
              </Paragraph>
              {/* <br />
          <a className="clickable green bold" href="#" target="_blank" strong>
            See full comment
          </a> */}
            </div>
          ) : null}
          <div className="pb-2">
            <Paragraph>{comment?.content}</Paragraph>
          </div>
          <Row className="justify-content-between mb-4">
            <Row>
              <Space size="large">
                <Space>
                  <ArrowUpOutlined className="clickable icon" />
                  <Text strong>150</Text>
                  <ArrowDownOutlined className="clickable icon" />
                </Space>
                <Text onClick={toggleReply} className="clickable" strong>
                  {isReply ? `Discard` : `Reply`}
                </Text>
              </Space>
            </Row>
            <Row>
              <Space size="large">
                <LinkOutlined className="clickable icon" />
              </Space>
            </Row>
          </Row>
          {isReply ? (
            <CommentForm
              onSubmit={handleSubmit}
              label={`Replying to ${comment?.userId?.name}'s comment`}
              onDiscard={handleDiscardReply}
            />
          ) : null}
        </div>
      ) : (
        renderEdit()
      )}
      <Divider />
    </div>
  );
}

export default Comment;
