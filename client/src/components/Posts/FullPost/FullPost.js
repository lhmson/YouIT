import React, { useEffect } from "react";
import {
  Avatar,
  Typography,
  Row,
  Tag,
  Space,
  Menu,
  Dropdown,
  message,
} from "antd";
import { MdPublic } from "react-icons/md";
import {
  EllipsisOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LinkOutlined,
  ShareAltOutlined,
  CaretRightOutlined,
  DeleteFilled,
  BellOutlined,
} from "@ant-design/icons";
import styles from "./styles";

const { Title, Text, Paragraph } = Typography;

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

function FullPost(props) {
  const { post } = props;

  const handleMore = () => {};

  const tagList = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

  const copyLink = (id) => {
    navigator.clipboard
      .writeText(`localhost:3000/post/${id}`) // change to deployment link later
      .then(() => message.success("Link copy successfully!"))
      .catch((error) => {
        message.error("Something goes wrong");
        console.log(id);
      });
  };

  return (
    <div>
      <div style={styles.item}>
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
                    {post?.userId?.name}
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
                Last edited {post?.updatedAt?.toString().slice(0, 10)}
              </Text>
            </div>
            <Dropdown
              overlay={menuMore}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="clickable" onClick={handleMore}>
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
            <Paragraph>{post?.content}</Paragraph>
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
            </Space>
          </Row>
          <Row>
            <Space size="large">
              <LinkOutlined
                className="clickable icon"
                onClick={() => copyLink(post._id)}
              />
              <ShareAltOutlined className="clickable icon" />
            </Space>
          </Row>
        </Row>
      </div>
    </div>
  );
}

export default FullPost;
