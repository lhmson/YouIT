import React from "react";
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
} from "antd";
import { MdPublic } from "react-icons/md";
import {
  EllipsisOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LinkOutlined,
  ShareAltOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../redux/actions/posts";
import COLOR from "../../../constants/colors";
import Comment from "../../Comment/Comment";

const { Title, Text, Paragraph, Link } = Typography;
const { TextArea } = Input;

function FullPost(props) {
  const { post } = props;
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleMore = () => {
    alert("more");
  };

  const tagList = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

  return (
    <Card style={{ padding: 16 }}>
      <div>
        <Row
          className="pb-2"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Row className="align-items-center" style={{ marginBottom: 16 }}>
            <Avatar
              className="ml-1 clickable"
              size={45}
              src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.6435-9/150532368_2890525287933380_4029393584172411335_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=vNeUmNaYi4gAX92GO8S&_nc_ht=scontent-xsp1-1.xx&oh=121b4b571f04f2b3741faa799e988b9d&oe=60A2B225"
            />
            <div className="d-inline-flex flex-column ml-3">
              <Row style={{ alignItems: "center" }}>
                <Space size={4}>
                  <Text
                    className="clickable"
                    strong
                    style={{ fontSize: "1.2rem" }}
                  >
                    {post?.creator}
                  </Text>
                  <CaretRightOutlined
                    style={{ fontSize: 18, paddingBottom: 5 }}
                  />
                  <Text
                    className="clickable"
                    strong
                    style={{ fontSize: "1.2rem" }}
                  >
                    Trại tâm thần đa ngôn ngữ*
                  </Text>
                </Space>
              </Row>
              <Text>Fullstack Developer</Text>
            </div>
          </Row>
          <Row className="justify-content-end align-items-center pb-3">
            <MdPublic className="gray mr-1" style={{ fontSize: 16 }} />
            <div className="mr-4">
              <Text type="secondary">Public</Text>
            </div>
            <div className="mr-4">
              <Text className="clickable" underline type="secondary">
                Posted {post?.createdAt.toString().slice(0, 10)}
              </Text>
            </div>

            <div className="clickable" onClick={handleMore}>
              <EllipsisOutlined className="clickable icon" />
            </div>
          </Row>
        </Row>
        <Row className="mb-1">
          {tagList.map((item) => (
            <Tag className="mb-2 tag">{item}</Tag>
          ))}
        </Row>
        <div>
          <Title level={2}>{post.title}</Title>
          <div className="pb-2">
            <Paragraph>
              Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph>
            <Paragraph>
              Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Some word Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </Paragraph>
            <Paragraph>
              Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph>
            <Paragraph>
              Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Paragraph>
          </div>
        </div>
        <Row className="justify-content-between mb-4">
          <Row>
            <Space size="large">
              <Space>
                <ArrowUpOutlined className="clickable icon" />
                <Text strong>150</Text>
                <ArrowDownOutlined className="clickable icon" />
              </Space>
              <Text strong>Comments (50)</Text>
            </Space>
          </Row>
          <Row>
            <Space size="large">
              <LinkOutlined className="clickable icon" />
              <ShareAltOutlined className="clickable icon" />
            </Space>
          </Row>
        </Row>
      </div>
      <TextArea rows={8} className="mb-4" />

      <Comment />
    </Card>
  );
}

export default FullPost;
