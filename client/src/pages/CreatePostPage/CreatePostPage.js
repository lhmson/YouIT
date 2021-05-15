import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.js";
import { Layout } from "antd";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";
import styles from "./styles.js";
import { useLocation } from "react-router";

const { Content } = Layout;

/// postId exists if user is editing a new post, otherwise is just editing an old post
function CreatePostPage() {
  const location = useLocation();
  const postId = location.state?.postId;

  useEffect(() => {}, []);

  return (
    <>
      <Layout style={{}}>
        <Navbar />
        <Layout style={styles.mainArea}>
          <Content>
            <h1 className="text-center">
              {postId ? "Edit your post" : "Create a post"}
            </h1>
            <CreatePostForm />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default CreatePostPage;
