import React from "react";
import { Layout } from "antd";
import styles from "./styles.js";
import Navbar from "../../components/Navbar/Navbar";

import ChatSpace from "../../components/Chat/ChatSpace.js";

function MessagePage() {
  return (
    <div>
      <Layout>
        <Navbar selectedMenu="message" />
        <Layout style={styles.mainArea}>
          <ChatSpace />
        </Layout>
      </Layout>
    </div>
  );
}

export default MessagePage;
