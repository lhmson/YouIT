import React, { useState, useEffect, useReducer } from "react";
import {
  Avatar,
  Typography,
  Space,
  Row,
  Menu,
  Dropdown,
  Tag,
  message,
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
import styles from "./styles";
import {
  upvotePost,
  unvotePost,
  downvotePost,
  getMyInteractions,
} from "../../../../api/post";
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

const allInteractionReducer = (state, action) => {
  switch (action.type) {
    case "upvote":
      return { ...state, upvotes: state.upvotes + 1 };
    case "downvote":
      return { ...state, downvotes: state.downvotes + 1 };
    case "unupvote":
      return { ...state, upvotes: state.upvotes - 1 };
    case "undownvote":
      return { ...state, downvotes: state.downvotes - 1 };
    default:
      return state;
  }
};

function FeedPost({ post, setCurrentId }) {
  const dispatch = useDispatch();

  const [myInteractions, setMyInteractions] = useState({});

  const [allInteractions, dispatchInteractions] = useReducer(
    allInteractionReducer,
    {
      upvotes: post.interactionInfo.listUpvotes.length,
      downvotes: post.interactionInfo.listDownvotes.length,
      // add more items later
    }
  );

  const tagList = ["tag 1", "tag 2", "tag 3", "tag 4"];

  useEffect(() => {
    fetchMyInteractions();
  }, []);

  const handleUpvoteClick = async (id) => {
    if (myInteractions?.upvote) {
      await unvotePost(id)
        .then((res) => {
          fetchMyInteractions();
          dispatchInteractions({ type: "unupvote" });
        })
        .catch((error) => {
          message.error("Something goes wrong with post upvote");
          console.log(error);
        });
    } else {
      await upvotePost(id)
        .then((res) => {
          if (myInteractions?.downvote) {
            dispatchInteractions({ type: "undownvote" });
          }
          fetchMyInteractions();
          dispatchInteractions({ type: "upvote" });
        })
        .catch((error) => {
          message.error("Something goes wrong with post unvote");
          console.log(error);
        });
    }
  };

  const handleDownvoteClick = async (id) => {
    if (myInteractions?.downvote) {
      await unvotePost(id)
        .then((res) => {
          fetchMyInteractions();
          dispatchInteractions({ type: "undownvote" });
        })
        .catch((error) => {
          message.error("Something goes wrong with post downvote");
          console.log(error);
        });
    } else {
      await downvotePost(id)
        .then((res) => {
          if (myInteractions?.upvote) {
            dispatchInteractions({ type: "unupvote" });
          }
          fetchMyInteractions();
          dispatchInteractions({ type: "downvote" });
        })
        .catch((error) => {
          message.error("Something goes wrong with post unvote");
          console.log(error);
        });
    }
  };

  const fetchMyInteractions = () => {
    getMyInteractions(post._id)
      .then((res) => setMyInteractions(res.data))
      .catch((error) => {
        message.error("Something goes wrong with post interactions");
        console.log(error);
      });
  };

  const copyLink = (id) => {
    navigator.clipboard
      .writeText(`localhost:3000/post/${id}`) // change to deployment link later
      .then(() => message.success("Link copy successfully!"))
      .catch((error) => {
        message.error("Something goes wrong");
      });
  };

  return (
    <div style={styles.item}>
      <div style={{ margin: 12 }}>
        <Row className="pb-2 justify-content-between align-items-center">
          <Row className="align-items-center" style={{ marginBottom: 16 }}>
            <Avatar
              className="ml-1 clickable"
              size={45}
              src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.6435-9/150532368_2890525287933380_4029393584172411335_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=vNeUmNaYi4gAX92GO8S&_nc_ht=scontent-xsp1-1.xx&oh=121b4b571f04f2b3741faa799e988b9d&oe=60A2B225"
            />
            <div className="d-inline-flex flex-column ml-3">
              <Row className="align-items-center">
                <Space size={4}>
                  <Link href={`/userinfo/${post?.userId._id}`} target="_blank">
                    <Text
                      className="clickable"
                      strong
                      style={{ fontSize: "1.2rem" }}
                    >
                      {post?.userId?.name}
                    </Text>
                  </Link>
                </Space>
              </Row>
              <Text>Fullstack Developer</Text>
            </div>
          </Row>
          <Row className="justify-content-end align-items-center pb-3">
            <MdPublic className="gray mr-1" style={{ fontSize: 16 }} />
            <div className="mr-4">
              <Text type="secondary">{post?.privacy}</Text>
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
          {tagList.map((item, i) => (
            <Tag key={i} className="mb-2 tag">
              {item}
            </Tag>
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
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph>
            <Paragraph>{post?.content}</Paragraph>
            <Link href={`/post/${post._id}`} target="_blank">
              <Text strong className="clickable">
                Click here to read more
              </Text>
            </Link>
          </div>
        </div>
        <Row className="justify-content-between my-4">
          <Row>
            <Space size="large">
              <Space>
                <ArrowUpOutlined
                  className="clickable icon"
                  style={{
                    color: myInteractions?.upvote ? COLOR.green : COLOR.black,
                  }}
                  onClick={() => handleUpvoteClick(post._id)}
                />
                <Text strong>{allInteractions.upvotes}</Text>
                <Text strong>{allInteractions.downvotes}</Text>
                <ArrowDownOutlined
                  className="clickable icon"
                  style={{
                    color: myInteractions?.downvote ? COLOR.green : COLOR.black,
                  }}
                  onClick={() => handleDownvoteClick(post._id)}
                />
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

export default FeedPost;
