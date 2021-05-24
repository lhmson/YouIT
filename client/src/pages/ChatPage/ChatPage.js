import React, { useEffect } from "react";
import { Layout } from "antd";
import styles from "./styles.js";
import Navbar from "../../components/Navbar/Navbar";

import ChatSample from "../../components/Chat/Chat.js";
import { MessageSidebar } from "../../components/index.js";

const { Content } = Layout;

function MessagePage() {
  return (
    <div>
      <Layout>
        <Navbar />
        {/* <Layout> */}
        <Layout style={styles.mainArea}>
          {/* <Content> */}
          <ChatSample />
          {/* </Content> */}
        </Layout>
        {/* </Layout> */}
      </Layout>
    </div>
  );
}

export default MessagePage;
