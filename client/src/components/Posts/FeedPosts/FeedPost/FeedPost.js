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
  Modal,
  Tooltip,
} from "antd";
import {
  EllipsisOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LinkOutlined,
  ShareAltOutlined,
  CaretRightOutlined,
  EditFilled,
  DeleteFilled,
  BellOutlined,
  FlagOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { MdPublic } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles";
import { ReactTinyLink } from "react-tiny-link";
import {
  upvotePost,
  unvotePost,
  downvotePost,
  getMyInteractions,
  getCommentsNumber,
  hidePost,
  followPost,
} from "../../../../api/post";
import { deletePost } from "../../../../redux/actions/posts";
import { HashLink } from "react-router-hash-link";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { limitNameLength } from "../../../../utils/limitNameLength";
import ShareButton from "./ShareButton";

const { Title, Text, Paragraph } = Typography;

const { confirm } = Modal;

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

  const history = useHistory();

  const [user] = useLocalStorage("user");

  const [myInteractions, setMyInteractions] = useState({});
  const [commentsNumber, setCommentsNumber] = useState(0);

  const [allInteractions, dispatchInteractions] = useReducer(
    allInteractionReducer,
    {
      upvotes: post.interactionInfo.listUpvotes.length,
      downvotes: post.interactionInfo.listDownvotes.length,
      // add more items later
    }
  );

  const tagList = ["tag 1", "tag 2", "tag 3", "tag 4"]; // handle tag later

  //#region menu more
  const showConfirmDeletePost = (id) => {
    confirm({
      title: "Do you want to delete this post?",
      icon: <ExclamationCircleOutlined />,
      content: "You cannot undo this action",
      onOk() {
        dispatch(deletePost(id));
        message.success("Post has been deleted");
        window.location.reload(); // load feed to have new items
      },
      onCancel() {
        message.info("Post is not deleted");
      },
    });
  };

  const handleDeletePost = (id) => {
    showConfirmDeletePost(id);
  };

  const handleEditPost = (postId, postTitle, postPrivacy, postContent) => {
    history.push({
      pathname: "/post/create",
      state: { postId },
    });
  };

  // still in construction
  const handleHidePost = (id) => {
    hidePost(id).then((res) => message.success("Hide post successfully"));
  };

  // still in construction
  const handleFollowPost = (id) => {
    followPost(id).then((res) => message.success("Follow post successfully"));
  };

  // still in construction
  const handleReportPost = (id) => {
    // followPost(id).then((res) => message.success("Report post successfully"));
  };

  const menuMore = (
    <Menu>
      {user?.result?._id === post?.userId?._id ? (
        <>
          <Menu.Item
            key="edit"
            onClick={() =>
              handleEditPost(
                post?._id,
                post?.title,
                post?.privacy,
                post?.content
              )
            }
          >
            <Row align="middle">
              <EditFilled className="mr-2" />
              <Text>Edit post</Text>
            </Row>
          </Menu.Item>
          <Menu.Item key="delete" onClick={() => handleDeletePost(post._id)}>
            <Row align="middle">
              <DeleteFilled className="red mr-2" />
              <Text className="red">Delete post</Text>
            </Row>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="follow" onClick={() => handleFollowPost(post._id)}>
            <Row align="middle">
              <BellOutlined className="mr-2" />
              <Text>Follow post</Text>
            </Row>
          </Menu.Item>
          <Menu.Item key="report" onClick={() => handleReportPost(post._id)}>
            <Row align="middle">
              <FlagOutlined className="mr-2" />
              <Text>Report post</Text>
            </Row>
          </Menu.Item>
        </>
      )}
      {/* <Menu.Item key="hide" onClick={() => handleHidePost(post._id)}>
        <Row align="middle">
          <StopOutlined className="mr-2" />
          <Text>Hide post</Text>
        </Row>
      </Menu.Item> */}
    </Menu>
  );

  //#endregion

  //#region handle interaction
  useEffect(() => {
    fetchMyInteractions();
    getCommentsNumber(post?._id).then((cn) => {
      setCommentsNumber(cn.data);
    });
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

  //#endregion

  const copyLink = (id) => {
    navigator.clipboard
      .writeText(`${window.location.origin}/post/${id}`) // change to deployment link later
      .then(() => message.success("Link copied to clipboard"))
      .catch((error) => {
        message.error("Something goes wrong copying link");
      });
  };

  const groupId = post?.groupPostInfo?.groupId;

  const renderUserInfo = () => {
    const userInfo = post?.userId?.userInfo;
    const education = userInfo.educations?.[userInfo.educations?.length - 1];
    const work = userInfo.works?.[userInfo.works?.length - 1];
    const educationInfo = education
      ? `${education?.moreInfo} at ${education?.schoolName}`
      : null;
    const workInfo = work ? `${work?.position} at ${work?.location}` : null;
    return workInfo || educationInfo;
  };

  const renderPrivacyIcon = (privacy) => {
    switch (privacy) {
      case "Friend":
        return <GiThreeFriends className="gray mr-1 icon" />;
      case "Private":
        return <IoPerson className="gray mr-1 icon" />;
      case "Public":
        return <MdPublic className="gray mr-1 icon" />;
      case "Group":
        return <MdPublic className="gray mr-1 icon" />;
      default:
        return <MdPublic className="gray mr-1 icon" />;
    }
  };

  return (
    <div style={styles.item}>
      <div style={{ margin: 12 }}>
        <Row className="pb-2 justify-content-between align-items-center">
          <Row className="align-items-center" style={{ marginBottom: 16 }}>
            <Avatar
              className="ml-1 clickable"
              size={45}
              src={post?.userId?.avatarUrl}
            />
            <div className="d-inline-flex flex-column ml-3 break-word">
              <Row className="align-items-center">
                <Space size={4}>
                  <Link to={`/userinfo/${post?.userId._id}`} target="_blank">
                    <Text
                      className="clickable"
                      strong
                      style={{ fontSize: "1.2rem" }}
                    >
                      {post?.userId?.name}
                    </Text>
                  </Link>

                  {groupId && (
                    <>
                      <CaretRightOutlined
                        style={{ fontSize: 18, paddingBottom: 5 }}
                      />
                      <Link to={`/group/${groupId._id}/main`} target="_blank">
                        <Text
                          className="clickable"
                          strong
                          style={{ fontSize: "1.2rem" }}
                        >
                          {groupId.name}
                        </Text>
                      </Link>
                    </>
                  )}
                </Space>
              </Row>
              <Text strong className="green">
                {renderUserInfo()}
              </Text>
            </div>
          </Row>
          <Row className="justify-content-end align-items-center pb-3">
            {renderPrivacyIcon(post?.privacy)}
            <Tooltip title="Privacy">
              <div className="mr-4">
                <Text type="secondary">{post?.privacy}</Text>
              </div>
            </Tooltip>

            <div className="mr-4">
              <Tooltip title={`Created ${moment(post?.createdAt).fromNow()}`}>
                <Text className="clickable" underline type="secondary">
                  Last edited {moment(post?.contentUpdatedAt).fromNow()}
                </Text>
              </Tooltip>
            </div>
            <Dropdown
              overlay={menuMore}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="clickable">
                <Tooltip title="Click to see more actions">
                  <EllipsisOutlined className="clickable icon" />
                </Tooltip>
              </div>
            </Dropdown>
          </Row>
        </Row>
        <Row className="mb-1">
          {tagList?.map((item, i) => (
            <Tag key={i} className="mb-2 tag">
              {item}
            </Tag>
          ))}
        </Row>
        <div className="break-word">
          <Title level={2}>{post?.title}</Title>
          <div className="pb-2">
            {/* <Paragraph>
              Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph> */}
            <Paragraph>{limitNameLength(post?.content?.text, 500)}</Paragraph>
            <Row className="justify-content-center">
              <ReactTinyLink
                cardSize="small"
                width={1500}
                // header="YouIT Share"
                showGraphic={true}
                defaultMedia="http://localhost:3000/static/media/lightlogo.c68302e9.png"
                maxLine={2}
                minLine={1}
                url="http://localhost:3000/userinfo/60b8fec93496700f58ecfc70"
              />
            </Row>

            <Link to={`/post/${post._id}`} target="_blank">
              <Text className="clickable bold">Click here to read more</Text>
            </Link>
          </div>
        </div>
        <Row className="justify-content-between my-4">
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
              {/* <HashLink to={`/post/${post._id}#comments`} target="_blank">
                <Text
                  style={{ fontSize: "1.2rem" }}
                  className=" clickable bold mx-2"
                >{`Comment (${post?.comments.length})`}</Text>
              </HashLink> */}
              <Link to={`/post/${post._id}#comments`} target="_blank">
                <Text
                  style={{ fontSize: "1.2rem" }}
                  className=" clickable bold mx-2"
                >{`Comment (${commentsNumber})`}</Text>
              </Link>
            </Space>
          </Row>
          <Row>
            <Space size="large">
              <Tooltip title="Copy link">
                <LinkOutlined
                  className="clickable icon"
                  onClick={() => copyLink(post._id)}
                />
              </Tooltip>
              <ShareButton post={post} />
            </Space>
          </Row>
        </Row>
      </div>
    </div>
  );
}

export default FeedPost;
