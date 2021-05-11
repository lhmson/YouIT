import React from "react";
import {
  Card,
  Avatar,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Menu,
  Dropdown,
  Tag,
  Divider,
} from "antd";
import {
  EllipsisOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LinkOutlined,
  ShareAltOutlined,
  DeleteFilled,
  BellOutlined,
} from "@ant-design/icons";
import { MdPublic } from "react-icons/md";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../../redux/actions/posts";
import styles from "./styles";
import COLOR from "../../../../constants/colors";

const { Title, Text, Paragraph, Link } = Typography;

const menuMore = (
  <Menu>
    <Menu.Item key="0">
      <Row align="middle">
        <BellOutlined className="mr-2" />
        <Text>Follow post</Text>
      </Row>
    </Menu.Item>
    <Menu.Item key="1">
      <Row align="middle">
        <DeleteFilled className="red mr-2" />
        <Text className="red">Delete post</Text>
      </Row>
    </Menu.Item>
  </Menu>
);

function FeedPost({ post, setCurrentId }) {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const tagList = ["tag 1", "tag 2", "tag 3", "tag 4"];

  return (
    <div style={styles.item}>
      <Row className="pb-2 px-2">
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
          className="justify-content-end align-items-center"
          style={{ flex: 2 }}
        >
          <div className="mr-4">
            <Text underline type="secondary">
              Post 5 days ago
            </Text>
          </div>
          <div className="mr-4">
            <Text type="secondary">Public</Text>
          </div>
          <div style={styles.pointer}>
            <EllipsisOutlined style={styles.icon} />
          </div>
        </Row>
      </Row>
      <Row style={styles.row}>
        {tagList.map((item) => (
          <Tag key={item} color={COLOR.greenSmoke} style={styles.tag}>
            {item}
          </Tag>
        ))}
      </Row>
      <div style={styles.row}>
        <Title level={2}>{post.title}</Title>
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

      <Divider />
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
                  {/* {post?.userId?.name} */}
                  Username
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
              Last edited {moment(post.updatedAt).fromNow()}
              {/* {post?.updatedAt.toString().slice(0, 10)} */}
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
      <Row className="mb-1">
        {tagList.map((item) => (
          <Tag className="mb-2 tag">{item}</Tag>
        ))}
      </Row>
      <div>
        <Title level={2}>{post?.title}</Title>
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
          <Link href="#" target="_blank" strong style={{ color: COLOR.green }}>
            See the post
          </Link>
        </div>
        <div className="pb-2" style={styles.row}></div>
      </div>
      <Row className="justify-content-between mb-4">
        <Row>
          <Space size="large">
            <Space>
              <ArrowUpOutlined className="clickable icon" />
              <Text strong>150</Text>
              <ArrowDownOutlined className="clickable icon" />
            </Space>
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
  );
}

export default FeedPost;
