import React, { useEffect } from "react";
import { Menu, Avatar } from "antd";

import "./styles.css";
import MessageSidebar from "./MessageSidebar/MessageSidebar";

function ChatSample() {
  return (
    <div>
      <div className="chat-container">
        <MessageSidebar />
        <div className="chat-title">
          <span>Daryl Duckmanton</span>
          <img src="favicon.ico" alt="Delete Conversation" />
        </div>

        <div className="chat-message-list">
          <div className="message-row you-message">
            <div className="message-content">
              <div className="message-text">
                Well we need to work out sometime soon where we really want to
                record our video course.
              </div>
              <div className="message-time">Apr 15</div>
            </div>
          </div>
          <div className="message-row other-message">
            <div className="message-content">
              <img
                src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                alt="Daryl Duckmanton"
              />
              <div className="message-text">
                I'm just in the process of finishing off the last pieces of
                material for the course.
              </div>
              <div className="message-time">Apr 14</div>
            </div>
          </div>
          <div className="message-row you-message">
            <div className="message-content">
              <div className="message-text">How's it going?</div>
              <div className="message-time">Apr 13</div>
            </div>
          </div>
          <div className="message-row other-message">
            <div className="message-content">
              <img
                src="https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                alt="Daryl Duckmanton"
              />
              <div className="message-text">Hey mate what's up?</div>
              <div className="message-time">Apr 13</div>
            </div>
          </div>
          <div className="message-row you-message">
            <div className="message-content">
              <div className="message-text">Hey Daryl?</div>
              <div className="message-time">Apr 13</div>
            </div>
          </div>
        </div>

        <div className="chat-form">
          <img src="favicon.ico" alt="Add Attachment" />
          <input type="text" placeholder="type a message" />
        </div>
      </div>
    </div>
  );
}

export default ChatSample;
