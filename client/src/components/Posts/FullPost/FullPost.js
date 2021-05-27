import React, { useEffect, useReducer, useState } from "react";
import {
  Avatar,
  Typography,
  Row,
  Tag,
  Space,
  Menu,
  Dropdown,
  message,
  Tooltip,
} from "antd";
import { MdPublic } from "react-icons/md";
import {
  EllipsisOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LinkOutlined,
  EditFilled,
  ShareAltOutlined,
  CaretRightOutlined,
  DeleteFilled,
  BellOutlined,
} from "@ant-design/icons";
import styles from "./styles";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import {
  upvotePost,
  unvotePost,
  downvotePost,
  getMyInteractions,
} from "../../../api/post";
const { Title, Text, Paragraph } = Typography;

function FullPost({ post }) {
  const [myInteractions, setMyInteractions] = useState({});
  const [listInteractions, setListInteractions] = useState({});
  // const [post, setPost] = useState(null);

  useEffect(() => {
    // setPost(props.post);
    fetchMyInteractions();
    // setListInteractions({
    //   upvoteslength: post?.interactionInfo?.listUpvotes?.length,
    //   downvoteslength: post?.interactionInfo?.listDownvotes?.length,
    // });
  }, [post]);

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
      case "init":
        return listInteractions;
      default:
        return state;
    }
  };

  const [allInteractions, dispatchInteractions] = useReducer(
    allInteractionReducer,
    {
      upvotes: post?.interactionInfo?.listUpvotes?.length,
      downvotes: post?.interactionInfo?.listDownvotes?.length,
      // upvotes: listInteractions.upvoteslength,
      // downvotes: listInteractions.downvoteslength,
      // add more items later
    }
  );

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
      .then((res) => {
        setMyInteractions(res.data);
        console.log("aaaaaaaaaaaaaaaaaa", res, post);
      })
      .catch((error) => {
        message.error("Something goes wrong with post interactions");
        console.log("uwuwuuw", error, post);
      });
  };

  const [user] = useLocalStorage("user");

  const handleMore = () => {};

  const tagList = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

  const menuMore = (
    <Menu>
      {user?.result?._id === post?.userId?._id ? (
        <>
          <Menu.Item key="1">
            <Row align="middle">
              <EditFilled className="mr-2" />
              <Text>Edit post</Text>
            </Row>
          </Menu.Item>
          <Menu.Item key="2">
            <Row align="middle">
              <DeleteFilled className="red mr-2" />
              <Text className="red">Delete post</Text>
            </Row>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="0">
          <Row align="middle">
            <BellOutlined className="mr-2" />
            <Text>Follow post</Text>
          </Row>
        </Menu.Item>
      )}
    </Menu>
  );

  const copyLink = (id) => {
    navigator.clipboard
      .writeText(`localhost:3000/post/${id}`) // change to deployment link later
      .then(() => message.success("Link copied to clipboard"))
      .catch((error) => {
        message.error("Something goes wrong copying link");
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
          {tagList.map((item, i) => (
            <Tag key={i} className="mb-2 tag">
              {item}
            </Tag>
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
                <Text strong style={{ fontSize: "1.5rem" }}>
                  {allInteractions.upvotes}
                </Text>
                <Tooltip title="Upvote">
                  <ArrowUpOutlined
                    className={`clickable icon ${
                      myInteractions?.upvote ? "green" : "black"
                    }`}
                    onClick={() => handleUpvoteClick(post._id)}
                  />
                </Tooltip>
                <Tooltip title="Downvote">
                  <ArrowDownOutlined
                    className={`clickable icon ${
                      myInteractions?.downvote ? "green" : "black"
                    }`}
                    onClick={() => handleDownvoteClick(post._id)}
                  />
                </Tooltip>
                <Text strong style={{ fontSize: "1.5rem" }}>
                  {allInteractions.downvotes}
                </Text>
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
