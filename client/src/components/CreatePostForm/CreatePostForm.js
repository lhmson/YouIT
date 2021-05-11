import React, { useEffect, useState } from "react";
import { Button } from "antd";
import CreatePostPrivacySelect from "./CreatePostPrivacySelect/CreatePostPrivacySelect.js";
import CreatePostSpaceAutoComplete from "./CreatePostSpaceAutoComplete/CreatePostSpaceAutoComplete.js";
import CreatePostTagSelect from "./CreatePostTagSelect/CreatePostTagSelect.js";
import CreatePostTitleInput from "./CreatePostTitleInput/CreatePostTitleInput.js";
import styles from "./styles.js";
import { createPost } from "../../api/post.js";
import { useHistory } from "react-router";
import PostEditor from "./PostEditor/PostEditor.js";
import { io } from "socket.io-client";

function CreatePostForm() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postSpace, setPostSpace] = useState("");
  const [postPrivacy, setPostPrivacy] = useState("");
  const [socket, setSocket] = useState(io("http://localhost:5000"));

  const history = useHistory();

  const wrapPostData = () => {
    const result = {
      title: postTitle,
      content: postContent,
      privacy: postPrivacy,
    };
    return result;
  };

  const handleSavePostButtonClick = () => {
    const newPost = wrapPostData();
    createPost(newPost)
      .then((res) => history.push(`/post/${res.data._id}`))
      .catch((error) => {
        alert("Something goes wrong");
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-start">
        <div className="col-8">
          <CreatePostTitleInput title={postTitle} setTitle={setPostTitle} />
        </div>
        <div className="col-4">
          <CreatePostSpaceAutoComplete setPostSpace={setPostSpace} />
        </div>
      </div>

      <div className="d-flex justify-content-start">
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
        <div className="col-1">
          <Button onClick={handleSavePostButtonClick}>Publish post</Button>
        </div>

        {/* <div className="col-1">
          <Button onClick={unSubNotification}>stop notif</Button>
        </div> */}
      </div>

      <div className="d-flex justify-content-start">
        <div className="col-12">
          <PostEditor
            postContent={postContent}
            setPostContent={setPostContent}
          />
        </div>
      </div>
    </div>
  );
}

export default CreatePostForm;
