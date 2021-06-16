import React, { useState, useEffect, useReducer } from "react";
import { Typography, Modal, Tooltip, Image } from "antd";
import { LinkOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { useHistory } from "react-router-dom";
import {
  FacebookShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
  HatenaShareCount,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  HatenaIcon,
} from "react-share";
import logo from "../../../../assets/lightlogo.png";

const { Title, Text, Paragraph } = Typography;

const { confirm } = Modal;

function ShareButton({ post }) {
  const [user] = useLocalStorage("user");

  const history = useHistory();

  const shareUrl = "https://github.com/kunal-mandalia/LevelUp";

  function openShare(post) {
    Modal.info({
      title: "Share post",
      content: (
        <div className="row justify-content-around align-items-center">
          <div onClick={() => console.log(window.location)}>
            <FacebookShareButton
              // url={`${window.location.origin}/post/${post._id}`}
              url={shareUrl}
              quote={post?.title}
              hashtag="YouIT"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <div>
              <FacebookShareCount
                // url={`${window.location.origin}/post/${post._id}`}
                url={shareUrl}
              >
                {(count) => count}
              </FacebookShareCount>
            </div>
          </div>

          {/* <div>
            <FacebookMessengerShareButton
              url={shareUrl}
              appId="521270401588372"
            >
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
          </div> */}

          <div>
            <TwitterShareButton url={shareUrl} title={post?.title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>

          <div>
            <TelegramShareButton url={shareUrl} title={post?.title}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>

          <div>
            <WhatsappShareButton
              url={shareUrl}
              title={post?.title}
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>

          <div>
            <LinkedinShareButton url={shareUrl} title={post?.title}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>

          <div>
            <RedditShareButton
              url={shareUrl}
              title={post?.title}
              windowWidth={660}
              windowHeight={460}
            >
              <RedditIcon size={32} round />
            </RedditShareButton>

            <div>
              <RedditShareCount url={shareUrl} />
            </div>
          </div>

          <div>
            <EmailShareButton
              url={shareUrl}
              subject={post?.title}
              body="I want to share this post from YouIt"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>

          <Tooltip title="Share YouIT">
            <img
              src={logo}
              alt="Share YouIt"
              className="clickable icon"
              style={{ width: 32, height: 32 }}
              onClick={() => handleSharePostInternal(post._id)}
            />
          </Tooltip>
        </div>
      ),
      onOk() {},
    });
  }

  const handleSharePostInternal = (id) => {
    Modal.destroyAll();
    history.push({
      pathname: `post/create`,
      state: { pinnedUrl: `${window.location.origin}/post/${id}` },
    });
  };

  return (
    <div>
      <Tooltip title="Share">
        <ShareAltOutlined
          className="clickable icon"
          onClick={() => openShare(post)}
        />
      </Tooltip>
    </div>
  );
}

export default ShareButton;
