import React, { useState } from 'react'
import CreatePostPrivacySelect from './CreatePostPrivacySelect/CreatePostPrivacySelect.js';
import CreatePostSpaceAutoComplete from './CreatePostSpaceAutoComplete/CreatePostSpaceAutoComplete.js';
import CreatePostTagSelect from './CreatePostTagSelect/CreatePostTagSelect.js';
import CreatePostTitleInput from './CreatePostTitleInput/CreatePostTitleInput.js';
import styles from './styles.js';

function CreatePostForm() {
  const [postSpace, setPostSpace] = useState("")
  const [postPrivacy, setPostPrivacy] = useState("")

  return (
    <div className="container-fluid" style={{ background: "yellow" }}>

      <div className="d-flex justify-content-start">
        <div className="col-4">
          <CreatePostTitleInput />
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
      </div>
    </div>
  )
}

export default CreatePostForm