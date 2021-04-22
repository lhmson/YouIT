import React, { useState } from 'react'
import { Button } from 'antd'
import CreatePostPrivacySelect from './CreatePostPrivacySelect/CreatePostPrivacySelect.js';
import CreatePostSpaceAutoComplete from './CreatePostSpaceAutoComplete/CreatePostSpaceAutoComplete.js';
import CreatePostTagSelect from './CreatePostTagSelect/CreatePostTagSelect.js';
import CreatePostTitleInput from './CreatePostTitleInput/CreatePostTitleInput.js';
import styles from './styles.js';
import { createPost } from '../../api/post.js';

function CreatePostForm() {
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("Chun cuteeeee")
  const [postSpace, setPostSpace] = useState("")
  const [postPrivacy, setPostPrivacy] = useState("")

  const wrapPostData = () => {
    const result = {
      title: postTitle,
      content: postContent,
      privacy: postPrivacy,
    }
    return result;
  }

  const handleSavePostButtonClick = () => {
    const newPost = wrapPostData();
    createPost(newPost);
  }

  return (
    <div className="container-fluid" style={{ background: "yellow" }}>

      <div className="d-flex justify-content-start">
        <div className="col-4">
          <CreatePostTitleInput title={postTitle} setTitle={setPostTitle} />
        </div>
        <div className="col-2">
          <CreatePostSpaceAutoComplete setPostSpace={setPostSpace} />
        </div>
      </div>

      <div className="d-flex justify-content-start">
        <div className="col-4">
          <CreatePostTagSelect />
        </div>
        <div className="col-2">
          <CreatePostPrivacySelect postSpace={postSpace} postPrivacy={postPrivacy} setPostPrivacy={setPostPrivacy} />
        </div>

        {/* May us have a common button component to call here? */}
        <div className="col-1">
          <Button onClick={handleSavePostButtonClick}>Save post</Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePostForm