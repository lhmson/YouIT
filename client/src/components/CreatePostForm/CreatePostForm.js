import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import CreatePostPrivacySelect from "./CreatePostPrivacySelect/CreatePostPrivacySelect.js";
import CreatePostSpaceAutoComplete from "./CreatePostSpaceAutoComplete/CreatePostSpaceAutoComplete.js";
import CreatePostTagSelect from "./CreatePostTagSelect/CreatePostTagSelect.js";
import CreatePostTitleInput from "./CreatePostTitleInput/CreatePostTitleInput.js";
import styles from "./styles.js";
import * as api from "../../api/post.js";
import { useHistory } from "react-router";
import PostEditor from "./PostEditor/PostEditor.js";
import CreatePostContentPinnedUrlInput from "./CreatePostContentPinnedUrlInput/CreatePostContentPinnedUrlInput.js";

function CreatePostForm({ postId, title, content, privacy }) {
  const [postTitle, setPostTitle] = useState(title ?? "");
  const [postContentText, setPostContentText] = useState(content?.text ?? "");
  const [postContentPinnedUrl, setPostContentPinnedUrl] = useState(content?.pinnedUrl ?? "");
  const [postSpace, setPostSpace] = useState(""); // just text
  const [selectedGroup, setSelectedGroup] = useState(null); // actual group
  const [postPrivacy, setPostPrivacy] = useState(privacy ?? "");

  const history = useHistory();

  const wrapPostData = () => {
    const result = {
      title: postTitle,
      content: {
        text: postContentText,
        pinnedUrl: postContentPinnedUrl,
      },
      privacy: postPrivacy,
    };

    if (selectedGroup) {
      result.groupId = selectedGroup._id;
    }

    return result;
  };

  const handleSavePostButtonClick = () => {
    const newPost = wrapPostData();
    if (!postId) {
      api
        .createPost(newPost)
        .then((res) => history.push(`/post/${res.data._id}`)) // go to specific post
        .catch((error) => {
          message.error("Something goes wrong. Check all fields");
          console.log(error);
        });
    } else {
      api
        .updatePost(postId, newPost)
        .then((res) => history.push(`/post/${res.data._id}`))
        .catch((error) => {
          message.error("Something goes wrong. Check all fields");
          console.log(error);
        });
    }
  };

  const handleSelectedGroupChange = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-start py-2">
        <div className="col-8">
          <CreatePostTitleInput title={postTitle} setTitle={setPostTitle} />
        </div>
        <div className="col-4">
          <CreatePostSpaceAutoComplete
            postSpace={postSpace}
            setPostSpace={setPostSpace}
            onSelectedGroupChange={handleSelectedGroupChange}
          />
        </div>
      </div>

      <div className="d-flex justify-content-start py-2">
        <div className="col-8">
          <CreatePostTagSelect />
        </div>
        <div className="col-2">
          <CreatePostPrivacySelect
            postSpace={postSpace}
            postPrivacy={postPrivacy}
            setPostPrivacy={setPostPrivacy}
          />
        </div>

        {/* May us have a common button component to call here? */}
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
