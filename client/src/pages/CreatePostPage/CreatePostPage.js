import React from 'react'
import Navbar from '../../components/Navbar/Navbar.js';
import Layout, { Content } from 'antd/lib/layout/layout';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm'
import styles from './styles.js';

/// isNewPost: true if user is adding a new post, false if user is just editting an old post
function CreatePostPage({ isNewPost = true }) {
  return (
    <>
      <Layout style={{}}>
        <Navbar selectedMenu="createPost" />

        {/* <div style={{ height: 200 }}></div> */}

        <Layout>
          <Content>
            <h1 className="text-center"> {isNewPost ? "Create a new post" : "Edit your post!"}</h1>
            <CreatePostForm />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default CreatePostPage