import React, { useState, useEffect, useReducer } from "react";
import {
  Avatar,
  Typography,
  Row,
  Space,
  Divider,
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
  DeleteFilled,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import COLOR from "../../constants/colors";
import CommentForm from "../CommentForm/CommentForm";
import {
  upvoteComment,
  downvoteComment,
  unvoteComment,
  getMyCommentInteractions,
} from "../../api/comment";
import MarkdownRenderer from "../Markdown/MarkdownRenderer/MarkdownRenderer";
import moment from "moment";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const { Text } = Typography;
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

function Comment({
  comment,
  onReply,
  onEdit,
  onDelete,
  onCopyCommentLink,
  isFocus,
  postId,
  interactionCallback,
}) {
  const [myInteractions, setMyInteractions] = useState({});
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [ellipsis, setEllipsis] = useState("full");

  const [user] = useLocalStorage("user");

  const [allInteractions, dispatchInteractions] = useReducer(
    allInteractionReducer,
    {
      upvotes: comment?.interactionInfo?.listUpvotes?.length,
      downvotes: comment?.interactionInfo?.listDownvotes?.length,
      // upvotes: listInteractions.upvoteslength,
      // downvotes: listInteractions.downvoteslength,
      // add more items later
    }
  );

  useEffect(() => {
    // setPost(props.post);
    fetchMyInteractions();
    // setListInteractions({
    //   upvoteslength: post?.interactionInfo?.listUpvotes?.length,
    //   downvoteslength: post?.interactionInfo?.listDownvotes?.length,
    // });
  }, [comment]);

  const handleUpvoteClick = async (id) => {
    if (!user) {
      message.info("You need to log in to upvote this comment!");
      return;
    }

    if (myInteractions?.upvote) {
      unvoteComment(id, postId)
        .then((res) => {
          interactionCallback();

          fetchMyInteractions().then(() =>
            dispatchInteractions({ type: "unupvote" })
          );
        })
        .catch((error) => {
          message.error("Something goes wrong with comment unvote");
          console.log(error);
        });
    } else {
      upvoteComment(id, postId)
        .then((res) => {
          interactionCallback();

          if (myInteractions?.downvote) {
            dispatchInteractions({ type: "undownvote" });
          }
          fetchMyInteractions().then(() =>
            dispatchInteractions({ type: "upvote" })
          );
        })
        .catch((error) => {
          message.error("Something goes wrong with comment upvote");
          console.log(error);
        });
    }
  };

  const handleDownvoteClick = async (id) => {
    if (!user) {
      message.info("You need to log in to downvote this comment!");
      return;
    }

    if (myInteractions?.downvote) {
      unvoteComment(id, postId)
        .then((res) => {
          interactionCallback();

          fetchMyInteractions().then(() =>
            dispatchInteractions({ type: "undownvote" })
          );
        })
        .catch((error) => {
          message.error("Something goes wrong with comment unvote");
          console.log(error);
        });
    } else {
      downvoteComment(id, postId)
        .then((res) => {
          interactionCallback();

          if (myInteractions?.upvote) {
            dispatchInteractions({ type: "unupvote" });
          }
          fetchMyInteractions().then(() =>
            dispatchInteractions({ type: "downvote" })
          );
        })
        .catch((error) => {
          message.error("Something goes wrong with comment downvote");
          console.log(error);
        });
    }
  };

  const fetchMyInteractions = () => {
    if (!user) return;

    const interactions = getMyCommentInteractions(comment._id)
      .then((res) => {
        setMyInteractions(res.data);
        return res.data;
      })
      .catch((error) => {
        message.error("Something goes wrong with comment interactions");
        console.log(error);
      });
    return interactions;
  };

  const toggleReply = () => {
    setIsReply((prev) => !prev);
    // console.log("comment", comment);
  };
  const handleReply = (newComment) => {
    onReply(comment?._id, newComment);
    setIsReply(false);
  };
  const onMoreSelect = ({ key }) => {
    switch (key) {
      case "0":
        setIsEdit(true);
        break;
      case "1":
        handleDelete();
        break;
      default:
        break;
    }
  };
  const showConfirmDeleteComment = (id) => {
    confirm({
      title: "Do you want to delete this comment?",
      icon: <ExclamationCircleOutlined />,
      content: "You cannot undo this action",
      onOk() {
        onDelete(id);
        message.success("Comment has been deleted");
      },
      onCancel() {
        message.info("Comment is not deleted");
      },
    });
  };
  const handleDelete = () => {
    showConfirmDeleteComment(comment?._id);
  };
  const renderEdit = () => {
    const handleDiscard = () => {
      setIsEdit(false);
    };
    return (
      <CommentForm
        label="Edit comment"
        onSubmit={handleEdit}
        onDiscard={handleDiscard}
        initContent={comment?.content}
      />
    );
  };

  const commentUpdated = (newComment, oldComment) => {
    if (newComment?.content !== oldComment?.content) return true;

    return false;
  };

  const handleEdit = (newComment) => {
    setIsEdit(false);

    if (commentUpdated(newComment, comment)) onEdit(comment?._id, newComment);
  };
  const handleDiscardReply = () => {
    setIsReply(false);
  };

  const menuMore = (
    <Menu onClick={onMoreSelect}>
      <Menu.Item key="0">
        <Row align="middle">
          <EditOutlined className="mr-2" />
          <Text>Edit comment</Text>
        </Row>
      </Menu.Item>
      <Menu.Item key="1">
        <Row align="middle">
          <DeleteFilled className="red mr-2" />
          <Text className="red">Delete comment</Text>
        </Row>
      </Menu.Item>
    </Menu>
  );

  const copyLink = (id) => {
    // navigator.clipboard
    //   // .writeText(id) // change to deployment link later
    //   .then(() => message.success("Link copied to clipboard"))
    //   .catch((error) => {
    //     message.error("Something goes wrong copying link");
    //     console.log(error);
    //   });
    onCopyCommentLink(id);
  };

  const isCommentOwner = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.result?._id.toString() === comment.userId._id;
  };

  const renderUserInfo = () => {
    const userInfo = comment?.userId?.userInfo;
    const education = userInfo?.educations?.[userInfo.educations?.length - 1];
    const work = userInfo?.works?.[userInfo.works?.length - 1];
    const educationInfo = education
      ? `${education?.moreInfo} at ${education?.schoolName}`
      : null;
    const workInfo = work ? `${work?.position} at ${work?.location}` : null;
    return workInfo || educationInfo;
  };

  return (
    <div
      className={isFocus ? "bg-green-smoke pt-4" : ""}
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <Row
        className={`pb-2`}
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Row className="align-items-center" style={{ marginBottom: 12 }}>
          <Avatar
            className="ml-1 clickable"
            size={45}
            src={comment?.userId?.avatarUrl}
          />
          <div className="d-inline-flex flex-column ml-3 break-word">
            <Row style={{ alignItems: "center" }}>
              <Space size={4}>
                <Text
                  className="clickable"
                  strong
                  style={{ fontSize: "1.2rem" }}
                >
                  {comment?.userId?.name}
                </Text>
              </Space>
            </Row>
            <Text>{renderUserInfo()}</Text>
          </div>
        </Row>
        <Row className="justify-content-end align-items-center pb-3">
          <div className="mr-4">
            <Text className="clickable" underline type="secondary">
              {`Last edited ${moment(comment?.contentUpdatedAt).fromNow()}`}
            </Text>
          </div>
          {isCommentOwner() && (
            <Dropdown
              overlay={menuMore}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="clickable">
                <EllipsisOutlined className="clickable icon" />
              </div>
            </Dropdown>
          )}
        </Row>
      </Row>
      {!isEdit ? (
        <div>
          {comment?.quotedCommentId !== undefined ? (
            <div
              className="p-3 mb-3"
              style={{ backgroundColor: COLOR.whiteSmoke }}
            >
              <Row
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {comment?.quotedCommentId === null ? (
                  <Text className="italic">Deleted comment</Text>
                ) : (
                  <Text className="black bold clickable">{`${comment?.quotedCommentId?.userId?.name}'s comment`}</Text>
                )}
                {comment?.quotedCommentId === null ? null : (
                  <Text className="clickable" underline type="secondary">
                    {`Last edited ${moment(
                      comment?.quotedCommentId?.contentUpdatedAt
                    ).fromNow()}`}
                  </Text>
                )}
              </Row>
              {/* <Paragraph style={{ color: COLOR.gray, marginBottom: 0 }}>
                {comment?.quotedCommentId?.content}
              </Paragraph> */}
              <MarkdownRenderer
                text={comment?.quotedCommentId?.content}
                enableDoubleClickFullScreen
              />

              {/* <br />
          <a className="clickable green bold" href="#" target="_blank" strong>
            See full comment
          </a> */}
            </div>
          ) : null}
          <div className="mb-2">
            <div>
              {/* <Paragraph className="">{comment?.content}</Paragraph> */}
              <MarkdownRenderer
                text={comment?.content}
                enableDoubleClickFullScreen
              />
            </div>
            {ellipsis !== "full" && <div className="bottom-fade"></div>}
          </div>
          <Row className="justify-content-between mb-4">
            <Row>
              <Space size="large">
                <Space>
                  <Text strong style={{ fontSize: "1.5rem" }}>
                    {comment?.interactionInfo?.listUpvotes?.length}
                  </Text>
                  <Tooltip title="Upvote">
                    <ArrowUpOutlined
                      className={`clickable icon ${
                        myInteractions?.upvote ? "green" : "black"
                      }`}
                      onClick={() => handleUpvoteClick(comment._id)}
                    />
                  </Tooltip>
                  <Tooltip title="Downvote">
                    <ArrowDownOutlined
                      className={`clickable icon ${
                        myInteractions?.downvote ? "green" : "black"
                      }`}
                      onClick={() => handleDownvoteClick(comment._id)}
                    />
                  </Tooltip>
                  <Text strong style={{ fontSize: "1.5rem" }}>
                    {comment?.interactionInfo?.listDownvotes?.length}
                  </Text>
                </Space>
                <Text onClick={toggleReply} className="clickable" strong>
                  {isReply ? `Discard` : `Reply`}
                </Text>
              </Space>
            </Row>
            <Row>
              <Space size="large">
                <Tooltip title="Get link">
                  <LinkOutlined
                    className="clickable icon"
                    onClick={() => copyLink(comment?._id)}
                  />
                </Tooltip>
              </Space>
            </Row>
          </Row>
          {isReply ? (
            <CommentForm
              onSubmit={handleReply}
              label={`Replying to ${comment?.userId?.name}'s comment`}
              onDiscard={handleDiscardReply}
            />
          ) : null}
        </div>
      ) : (
        renderEdit()
      )}

      <Divider />
    </div>
  );
}

export default Comment;
