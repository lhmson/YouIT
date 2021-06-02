import React from "react";
import { Layout } from "antd";
import styles from "./styles.js";
import Navbar from "../../components/Navbar/Navbar";

import ChatSpace from "../../components/Chat/ChatSpace.js";
import { ConversationsProvider } from "../../context/ConversationsContext.js";

function MessagePage() {
  return (
    <div>
      <Layout>
        <Navbar selectedMenu="message" />
        <Layout style={styles.mainArea}>
          <ConversationsProvider>
            <ChatSpace />
          </ConversationsProvider>
        </Layout>
      </Layout>
    </div>
  );
}

export default MessagePage;
