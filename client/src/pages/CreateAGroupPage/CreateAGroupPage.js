import React from "react";
import { Button, Layout, Row, Col } from "antd";
import CreateAGroup from "../../components/CreateAGroup/CreateAGroup.js";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./styles.js";

/// isNewPost: true if user is adding a new post, false if user is just editting an old post
function CreateAGroupPage({ isNewPost = true }) {
  return (
    <Layout>
      <Navbar />
      {/* <Col span={12} style={{ background: "black", height: 1000 }}></Col> */}
      <CreateAGroup></CreateAGroup>
    </Layout>
  );
}

export default CreateAGroupPage;
