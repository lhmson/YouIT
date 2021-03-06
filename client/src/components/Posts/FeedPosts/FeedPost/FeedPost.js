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
import ShareButton from "../../ShareButton";
import { BACKEND_URL, FRONTEND_URL } from "../../../../constants/config";
import Loading from "../../../Loading/Loading";

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

  const [loading, setLoading] = useState(false);

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

  //TODO: still in construction
  const handleHidePost = (id) => {
    hidePost(id).then((res) => message.success("Hide post successfully"));
  };

  //TODO: still in construction
  const handleFollowPost = (id) => {
    followPost(id).then((res) => message.success("Follow post successfully"));
  };

  //TODO: still in construction
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
          <Menu.Item key="delete" onClick={() => handleDeletePost(post?._id)}>
            <Row align="middle">
              <DeleteFilled className="red mr-2" />
              <Text className="red">Delete post</Text>
            </Row>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="follow" onClick={() => handleFollowPost(post?._id)}>
            <Row align="middle">
              <BellOutlined className="mr-2" />
              <Text>Follow post</Text>
            </Row>
          </Menu.Item>
          <Menu.Item key="report" onClick={() => handleReportPost(post?._id)}>
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
    if (loading) {
      return;
    }
    if (!user) {
      message.info("You need to log in to upvote this post!");
      return;
    }

    setLoading(true);
    if (myInteractions?.upvote) {
      unvotePost(id)
        .then((res) => {
          fetchMyInteractions().then(() =>
            dispatchInteractions({ type: "unupvote" })
          );
        })
        .catch((error) => {
          message.error("Something goes wrong with post unvote");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      upvotePost(id)
        .then((res) => {
          if (myInteractions?.downvote) {
            dispatchInteractions({ type: "undownvote" });
          }
          fetchMyInteractions().then(() =>
            dispatchInteractions({ type: "upvote" })
          );
        })
        .catch((error) => {
          message.error("Something goes wrong with post upvote");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDownvoteClick = async (id) => {
    if (loading) {
      return;
    }
    if (!user) {
      message.info("You need to log in to downvote this post!");
      return;
    }

    setLoading(true);
    if (myInteractions?.downvote) {
      unvotePost(id)
        .then((res) => {
          fetchMyInteractions().then(() =>
            dispatchInteractions({ type: "undownvote" })
          );
        })
        .catch((error) => {
          message.error("Something goes wrong with post unvote");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      downvotePost(id)
        .then((res) => {
          if (myInteractions?.upvote) {
            dispatchInteractions({ type: "unupvote" });
          }
          fetchMyInteractions().then(() =>
            dispatchInteractions({ type: "downvote" })
          );
        })
        .catch((error) => {
          message.error("Something goes wrong with post downvote");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const fetchMyInteractions = () => {
    if (!user) return;

    const interactions = getMyInteractions(post._id)
      .then((res) => {
        setMyInteractions(res.data);
        return res.data;
      })
      .catch((error) => {
        message.error("Something goes wrong with post interactions");
        console.log(error);
      });
    return interactions;
  };

  //#endregion

  const copyLink = (id) => {
    navigator.clipboard
      .writeText(`${FRONTEND_URL}/post/${id}`) // change to deployment link later
      .then(() => message.success("Link copied to clipboard"))
      .catch((error) => {
        message.error("Something goes wrong copying link");
      });
  };

  const groupId = post?.groupPostInfo?.groupId;

  const renderUserInfo = () => {
    const userInfo = post?.userId?.userInfo;
    const education = userInfo
      ? userInfo.educations?.[userInfo.educations?.length - 1]
      : null;
    const work = userInfo ? userInfo.works?.[userInfo.works?.length - 1] : null;
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
                  <Link to={`/userinfo/${post?.userId?._id}`} target="_blank">
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
                      <Link to={`/group/${groupId?._id}/main`} target="_blank">
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
              <Link to={`/post/${post?._id}`} target="_blank">
                <Tooltip title={`Created ${moment(post?.createdAt).fromNow()}`}>
                  <Text className="clickable" underline type="secondary">
                    Last edited {moment(post?.contentUpdatedAt).fromNow()}
                  </Text>
                </Tooltip>
              </Link>
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
          {post?.hashtags?.map((item, i) => (
            <Tooltip
              title={`Mentioned ${item?.count} time${
                item?.count > 1 ? "s" : ""
              }`}
            >
              <Tag key={i} className="mb-2 tag">
                {item.name}
              </Tag>
            </Tooltip>
          ))}
        </Row>
        <div className="break-word">
          <Title level={2}>{post?.title}</Title>
          <div className="pb-2">
            <Paragraph>{post?.content?.overview}</Paragraph>

            {post?.content?.pinnedUrl && (
              <Row className="justify-content-center">
                <ReactTinyLink
                  cardSize="small"
                  showGraphic={true}
                  maxLine={2}
                  minLine={1}
                  url={post?.content?.pinnedUrl}
                />
              </Row>
            )}

            <Link to={`/post/${post?._id}`} target="_blank">
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

                {loading ? (
                  <Loading size="small" />
                ) : (
                  <Tooltip title="Upvote">
                    <ArrowUpOutlined
                      className={`clickable icon ${
                        myInteractions?.upvote ? "green" : "black"
                      }`}
                      onClick={() => handleUpvoteClick(post?._id)}
                    />
                  </Tooltip>
                )}

                {loading ? (
                  <Loading size="small" />
                ) : (
                  <Tooltip title="Downvote">
                    <ArrowDownOutlined
                      className={`clickable icon ${
                        myInteractions?.downvote ? "green" : "black"
                      }`}
                      onClick={() => handleDownvoteClick(post?._id)}
                    />
                  </Tooltip>
                )}

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
              <Link to={`/post/${post?._id}#comments`} target="_blank">
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
                  onClick={() => copyLink(post?._id)}
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
