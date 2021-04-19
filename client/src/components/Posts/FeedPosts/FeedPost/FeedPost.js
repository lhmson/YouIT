import React from "react";
import { Card, Avatar, Button, Typography, Row, Col, Tag } from "antd";
import {
  EllipsisOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LinkOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../../redux/actions/posts";
import styles from "./styles";
import COLOR from "../../../../constants/colors";

const { Title, Text, Paragraph, Link } = Typography;

function FeedPost({ post, setCurrentId }) {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleMore = () => {
    alert("more");
  };

  const tagList = ["tag 1", "tag 2", "tag 3", "tag 4"];

  return (
    <div style={styles.item}>
      <Row className="pb-2">
        <Row
          className="align-items-center"
          style={{
            ...styles.pointer,
            flex: 3,
          }}
        >
          <Avatar
            size="large"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <div className="d-inline-flex flex-column ml-2">
            <Text strong style={{ fontSize: "1.2rem" }}>
              Username
            </Text>
            <Text>Info</Text>
          </div>
        </Row>
        <Row
          className="justify-content-between align-items-center"
          style={{ flex: 2 }}
        >
          <div>
            <Text underline type="secondary">
              Post 5 days ago
            </Text>
          </div>
          <div>
            <Text type="secondary">Public</Text>
          </div>
          <div style={styles.pointer} onClick={handleMore}>
            <EllipsisOutlined style={styles.icon} />
          </div>
        </Row>
      </Row>
      <Row style={styles.row}>
        {tagList.map((item) => (
          <Tag color={COLOR.greenSmoke} style={styles.tag}>
            {item}
          </Tag>
        ))}
      </Row>
      <div style={styles.row}>
        <Title level={2}>Big title</Title>
      </div>
      <div className="pb-2" style={styles.row}>
        <Paragraph>
          Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Paragraph>
        <Link href="#" target="_blank" strong style={{ color: COLOR.green }}>
          See the post
        </Link>
      </div>
      <Row
        className="justify-content-between"
        style={{
          ...styles.row,
          flex: 12,
        }}
      >
        <Row className="justify-content-between" style={{ flex: 3 }}>
          <ArrowUpOutlined style={{ ...styles.icon, ...styles.pointer }} />
          <Text strong>150</Text>
          <ArrowDownOutlined style={{ ...styles.icon, ...styles.pointer }} />
          <Text strong style={styles.pointer}>
            Comments (50)
          </Text>
        </Row>
        <Row style={{ flex: 8 }}></Row>
        <Row className="justify-content-between" style={{ flex: 1 }}>
          <LinkOutlined style={{ ...styles.icon, ...styles.pointer }} />
          <ShareAltOutlined style={{ ...styles.icon, ...styles.pointer }} />
        </Row>
      </Row>
    </div>
  );
}

export default FeedPost;
