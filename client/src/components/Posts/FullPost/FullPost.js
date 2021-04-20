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
import styles from "./styles";
import COLOR from "../../../constants/colors";

const { Title, Text, Paragraph, Link } = Typography;
const { TextArea } = Input;

function FullPost({ post, setCurrentId }) {
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
              className="ml-1"
              size={45}
              src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.6435-9/150532368_2890525287933380_4029393584172411335_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=vNeUmNaYi4gAX92GO8S&_nc_ht=scontent-xsp1-1.xx&oh=121b4b571f04f2b3741faa799e988b9d&oe=60A2B225"
            />
            <div className="d-inline-flex flex-column ml-3">
              <Row style={{ alignItems: "center" }}>
                <Space size={4}>
                  <Text strong style={{ fontSize: "1.2rem" }}>
                    Ngô Công Hậu
                  </Text>
                  <CaretRightOutlined
                    style={{ fontSize: 18, paddingBottom: 5 }}
                  />
                  <Text strong style={{ fontSize: "1.2rem" }}>
                    Trại Tâm Thần Đa Ngôn Ngữ 2.0
                  </Text>
                </Space>
              </Row>
              <Text>Fullstack Developer</Text>
            </div>
          </Row>
          <Row className="justify-content-end align-items-center pb-3">
            <div className="mr-4">
              <Text underline type="secondary">
                Post 5 days ago
              </Text>
            </div>
            <div className="mr-4">
              <Text type="secondary">Public</Text>
            </div>
            <div style={styles.pointer} onClick={handleMore}>
              <EllipsisOutlined style={styles.icon} />
            </div>
          </Row>
        </Row>
        <Row className="mb-1">
          {tagList.map((item) => (
            <Tag className="mb-2" color={COLOR.greenSmoke} style={styles.tag}>
              {item}
            </Tag>
          ))}
        </Row>
        <div>
          <Title level={2}>Big title</Title>
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
                <ArrowUpOutlined
                  style={{ ...styles.icon, ...styles.pointer }}
                />
                <Text strong>150</Text>
                <ArrowDownOutlined
                  style={{ ...styles.icon, ...styles.pointer }}
                />
              </Space>
              <Text strong style={styles.pointer}>
                Comments (50)
              </Text>
            </Space>
          </Row>
          <Row>
            <Space size="large">
              <LinkOutlined style={{ ...styles.icon, ...styles.pointer }} />
              <ShareAltOutlined style={{ ...styles.icon, ...styles.pointer }} />
            </Space>
          </Row>
        </Row>
      </div>
      <TextArea rows={8} className="mb-4" />

      <div>
        <Row
          className="pb-2"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Row className="align-items-center" style={{ marginBottom: 16 }}>
            <Avatar
              className="ml-1"
              size={45}
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-1/p240x240/167274298_2791941774405213_2973980969027075470_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=QpKEyCIKuj0AX8HRcN6&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=96abb4f8e352f1223ecf465f760a78e8&oe=60A5BF59"
            />
            <div className="d-inline-flex flex-column ml-3">
              <Row style={{ alignItems: "center" }}>
                <Space size={4}>
                  <Text strong style={{ fontSize: "1.2rem" }}>
                    Quản Tiến Nghĩa
                  </Text>
                  <CaretRightOutlined
                    style={{ fontSize: 18, paddingBottom: 5 }}
                  />
                  <Text underline style={{ fontSize: "1.2rem" }}>
                    Bình luận của{" "}
                    <Text strong style={{ fontSize: "1.2rem" }}>
                      Phạm Liên Sanh
                    </Text>
                  </Text>
                </Space>
              </Row>
              <Text>Fullstack Developer</Text>
            </div>
          </Row>
          <Row className="justify-content-end align-items-center pb-3">
            <div className="mr-4">
              <Text underline type="secondary">
                Post 5 days ago
              </Text>
            </div>
            <div style={styles.pointer} onClick={handleMore}>
              <EllipsisOutlined style={styles.icon} />
            </div>
          </Row>
        </Row>
        <div className="pb-2">
          <Paragraph>
            Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Paragraph>
          <Paragraph>
            Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Some word
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum. Some word Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Paragraph>
          <Paragraph>
            Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Some word
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Paragraph>
          <Paragraph>
            Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </Paragraph>
        </div>
        <Row className="justify-content-between mb-4">
          <Row>
            <Space size="large">
              <Space>
                <ArrowUpOutlined
                  style={{ ...styles.icon, ...styles.pointer }}
                />
                <Text strong>150</Text>
                <ArrowDownOutlined
                  style={{ ...styles.icon, ...styles.pointer }}
                />
              </Space>
            </Space>
          </Row>
          <Row>
            <Space size="large">
              <LinkOutlined style={{ ...styles.icon, ...styles.pointer }} />
            </Space>
          </Row>
        </Row>
        <Divider />
      </div>
    </Card>
  );
}

export default FullPost;
