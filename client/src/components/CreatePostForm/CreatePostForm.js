import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import CreatePostPrivacySelect from "./CreatePostPrivacySelect/CreatePostPrivacySelect.js";
import CreatePostSpaceAutoComplete from "./CreatePostSpaceAutoComplete/CreatePostSpaceAutoComplete.js";
import CreatePostTagSelect from "./CreatePostTagSelect/CreatePostTagSelect.js";
import CreatePostTitleInput from "./CreatePostTitleInput/CreatePostTitleInput.js";
import CreatePostContentPinnedUrlInput from "./CreatePostContentPinnedUrlInput/CreatePostContentPinnedUrlInput.js";
import CreatePostOverviewInput from "./CreatePostOverviewInput/CreatePostOverviewInput.js";
import * as api from "../../api/post.js";
import { useHistory } from "react-router";
import PostEditor from "./PostEditor/PostEditor.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { Prompt } from "react-router-dom";
import { isURL } from "../../utils/isUrl.js";

function CreatePostForm({
  postId = null,
  initialGroupId = null,
  pinnedUrl = "",
}) {
  const [user] = useLocalStorage("user");
  const [postTitle, setPostTitle] = useState("");
  const [postContentText, setPostContentText] = useState("");
  const [postContentPinnedUrl, setPostContentPinnedUrl] = useState(pinnedUrl);
  const [postContentOverview, setPostContentOverview] = useState("");
  const [postSpace, setPostSpace] = useState(""); // just text
  const [selectedGroup, setSelectedGroup] = useState(null); // actual group
  const [postPrivacy, setPostPrivacy] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [listHashtagNames, setListHashtagNames] = useState([]);

  const [safeToLeave, setSafeToLeave] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!user?.result?._id) {
      message.error("Please sign in to create a post.", 1, () => {
        setSafeToLeave(true);
        history.push(`/login`);
      });
    }

    if (postId)
      api
        .fetchAPost(postId)
        .then((res) => {
          if (res.data?.userId._id !== user?.result?._id) {
            message.error("You cannot edit others' posts.", 1, () => {
              setSafeToLeave(true);
              history.goBack();
            });
          }

          setEditingPost(res.data);
        })
        .catch((reason) => {
          message.error("Something went wrong.", 1, () => {
            setSafeToLeave(true);
            history.goBack();
          });
        });
  }, []);

  useEffect(() => {
    if (editingPost) setEditingPostToFields(editingPost);
  }, [editingPost]);

  const setEditingPostToFields = (post) => {
    setPostTitle(post?.title ?? "");
    setPostContentOverview(post?.content?.overview ?? "");
    setPostContentText(post?.content?.text ?? "");
    setPostContentPinnedUrl(post?.content?.pinnedUrl ?? "");
    setPostPrivacy(post?.privacy ?? "");

    setListHashtagNames(post?.hashtags?.map((tag) => tag?.name));
  };

  const wrapPostData = () => {
    const result = {
      title: postTitle?.trim?.(),
      content: {
        overview: postContentOverview?.trim?.(),
        text: postContentText?.trim?.(),
        pinnedUrl: postContentPinnedUrl?.trim?.(),
      },
      privacy: postPrivacy,
      hashtagNames: listHashtagNames,
    };

    if (selectedGroup) {
      result.groupId = selectedGroup._id;
    }

    return result;
  };

  /**
   * @returns {{isValid: boolean, message: string}}
   */
  const checkPostData = (post) => {
    const errorResult = (message) => ({
      isValid: false,
      message,
    });

    if (!post) return errorResult("Something when wrong.");
    if (!post.title) return errorResult("A post must have a title.");
    if (!post.content?.overview) return errorResult("A post must have an overview.");
    if (!post.content?.text && !post.content?.pinnedUrl)
      return errorResult("A post must have some content.");
    if (post.content.text.length <= 10 && !post.content?.pinnedUrl) {
      return errorResult("Your post is too short, at least 15 characters");
    }
    if (post?.content?.pinnedUrl && !isURL(post?.content?.pinnedUrl))
      return errorResult("Attached URL is not valid");
    if (post.privacy === "Group" && !post.groupId)
      return errorResult("The selected group to post is not valid");

    return {
      isValid: true,
      message: null,
    };
  };

  const handleSavePostButtonClick = () => {
    const newPost = wrapPostData();

    const validation = checkPostData(newPost);
    if (!validation.isValid) {
      message.error(validation.message, 1);
      return;
    }

    if (!postId) {
      api
        .createPost(newPost)
        .then((res) => {
          setSafeToLeave(true);
          history.push(`/post/${res.data._id}`);
        }) // go to specific post
        .catch((error) => {
          message.error("Something goes wrong. Check all fields", 2);
          console.log(error);
        });
    } else {
      api
        .updatePost(postId, newPost)
        .then((res) => {
          setSafeToLeave(true);
          history.push(`/post/${res.data._id}`);
        })
        .catch((error) => {
          message.error("Something goes wrong. Check all fields", 2);
          console.log(error);
        });
    }
  };

  const handleSelectedGroupChange = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className="container-fluid">
      <Prompt
        message="Your post may not be saved. Are you sure you want to leave?"
        when={!safeToLeave}
      />

      <div className="d-flex justify-content-start py-2">
        <div className="col-8">
          <CreatePostTitleInput title={postTitle} setTitle={setPostTitle} />
        </div>
        <div className="col-4">
          <CreatePostSpaceAutoComplete
            postSpace={postSpace}
            setPostSpace={setPostSpace}
            onSelectedGroupChange={handleSelectedGroupChange}
            initialGroupId={
              postId ? editingPost?.groupPostInfo?.groupId?._id : initialGroupId
            }
            disabled={Boolean(postId) || Boolean(initialGroupId)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-start py-2">
        <div className="col-8">
          <CreatePostTagSelect
            onChange={setListHashtagNames}
            defaultTags={listHashtagNames ?? []}
          />
        </div>
        <div className="col-2">
          <CreatePostPrivacySelect
            postSpace={postSpace}
            postPrivacy={postPrivacy}
            setPostPrivacy={setPostPrivacy}
          />
        </div>

        <div className="col-2">
          <Button
            className="green-button"
            onClick={handleSavePostButtonClick}
            style={{ width: "100%", fontWeight: "bold" }}
          >
            PUBLISH
          </Button>
        </div>

        {/* <div className="col-1">
          <Button onClick={unSubNotification}>stop notif</Button>
        </div> */}
      </div>


      <div className="d-flex justify-content-start py-2">
        <div className="col-12">
          <CreatePostOverviewInput
            overview={postContentOverview}
            setOverview={setPostContentOverview}
          />
        </div>
      </div>

      <div className="d-flex justify-content-start py-2">
        <div className="col-12">
          <PostEditor
            postContentText={postContentText}
            setPostContentText={setPostContentText}
          />
        </div>
      </div>
      <div className="d-flex justify-content-start py-2">
        <div className="col-12">
          <CreatePostContentPinnedUrlInput
            contentPinnedUrl={postContentPinnedUrl}
            setContentPinnedUrl={setPostContentPinnedUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default CreatePostForm;
