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
  Modal,
} from "antd";

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
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { MdPublic } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import ShareButton from "../ShareButton";
import styles from "./styles";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import {
  upvotePost,
  unvotePost,
  downvotePost,
  getMyInteractions,
} from "../../../api/post";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deletePost } from "../../../redux/actions/posts";
import MarkdownRenderer from "../../Markdown/MarkdownRenderer/MarkdownRenderer";
import { ReactTinyLink } from "react-tiny-link";
import { FRONTEND_URL } from "../../../constants/config";

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

function FullPost({ post }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // alert(JSON.stringify(post));
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
    getMyInteractions(post?._id)
      .then((res) => {
        setMyInteractions(res.data);
      })
      .catch((error) => {
        message.error("Something goes wrong with post interactions");
        console.log(error, post);
      });
  };

  const [user] = useLocalStorage("user");

  const handleMore = () => {};

  //#region menu more

  const showConfirmDeletePost = (id) => {
    confirm({
      title: "Do you want to delete this post?",
      icon: <ExclamationCircleOutlined />,
      content: "You cannot undo this action",
      onOk() {
        dispatch(deletePost(id));
        message.success("Post has been deleted");
        history.push("/feed");
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
          <Menu.Item
            key="delete"
            onClick={() => {
              handleDeletePost(post?._id);
            }}
          >
            <Row align="middle">
              <DeleteFilled className="red mr-2" />
              <Text className="red">Delete post</Text>
            </Row>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="follow">
          <Row align="middle">
            <BellOutlined className="mr-2" />
            <Text>Follow post</Text>
          </Row>
        </Menu.Item>
      )}
    </Menu>
  );

  //#endregion

  // const menuMore = (
  //   <Menu>
  //     {user?.result?._id === post?.userId?._id ? (
  //       <>
  //         <Menu.Item key="1">
  //           <Row align="middle">
  //             <EditFilled className="mr-2" />
  //             <Text>Edit post</Text>
  //           </Row>
  //         </Menu.Item>
  //         <Menu.Item key="2">
  //           <Row align="middle">
  //             <DeleteFilled className="red mr-2" />
  //             <Text className="red">Delete post</Text>
  //           </Row>
  //         </Menu.Item>
  //       </>
  //     ) : (
  //       <Menu.Item key="0">
  //         <Row align="middle">
  //           <BellOutlined className="mr-2" />
  //           <Text>Follow post</Text>
  //         </Row>
  //       </Menu.Item>
  //     )}
  //   </Menu>
  // );

  const copyLink = (id) => {
    navigator.clipboard
      .writeText(`${FRONTEND_URL}/post/${id}`) // change to deployment link later
      .then(() => message.success("Link copied to clipboard"))
      .catch((error) => {
        message.error("Something goes wrong copying link");
        console.log(id);
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
              src={post?.userId?.avatarUrl}
            />
            <div className="d-inline-flex flex-column ml-3 break-word">
              <Row style={{ alignItems: "center" }}>
                <Space size={4}>
                  <Text
                    className="clickable"
                    strong
                    style={{ fontSize: "1.2rem" }}
                  >
                    {post?.userId?.name}
                  </Text>
                  {groupId && (
                    <>
                      <CaretRightOutlined
                        style={{ fontSize: 18, paddingBottom: 5 }}
                      />
                      <Link to={`/group/${groupId._id}/main`}>
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
              <Tooltip
                title={`Created ${post?.createdAt?.toString().slice(0, 10)}`}
              >
                <Text className="clickable" underline type="secondary">
                  Last edited {post?.contentUpdatedAt?.toString().slice(0, 10)}
                </Text>
              </Tooltip>
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

            <MarkdownRenderer text={post?.content?.text} />

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

export default FullPost;
