import React, { useEffect, useState } from "react";
import { Button, Input, Layout, Row, Tag } from "antd";

import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.js";

import * as apiHashtag from "../../../../api/hashtag";
import * as apiUser from "../../../../api/user_info";
import { isLoginUser } from "../../../../utils/user.js";

function ProgrammingPane() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isLogin = isLoginUser(user);

  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [listHashtags, setListHashtags] = useState([]);

  const fetchProgrammingHashtags = async () => {
    const hashtags = await (
      await apiHashtag.fetchProgrammingHashtags(user?._id)
    ).data;
    setListHashtags(hashtags);
  };

  useEffect(() => {
    fetchProgrammingHashtags();
  }, []);

  const removeHashtag = async (removedHashtagId) => {
    // front
    const hashtags = listHashtags.filter(
      (tag) => tag?._id !== removedHashtagId
    );
    setListHashtags(hashtags);

    // back
    await apiUser.removeProgrammingHashtag(removedHashtagId);
    await apiHashtag.deleteHashtag(removedHashtagId);
  };

  const handleInputConfirm = async () => {
    if (inputValue && listHashtags.indexOf(inputValue) === -1) {
      // back
      const newHashtag = {
        name: inputValue,
      };
      const { data } = await apiHashtag.createHashtag(newHashtag);
      await apiUser.addProgrammingHashtag(data?._id);

      // front
      setListHashtags([...listHashtags, data]);
      setIsAdding(false);
      setInputValue("");
      console.log(data);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const TagItems = () => {
    return listHashtags.map((hashtag) => {
      return (
        <span
          key={hashtag?._id}
          style={{ display: "inline-block", marginBottom: 8 }}
        >
          <Tag
            color="green"
            closable={isLogin}
            onClose={(e) => {
              e.preventDefault();
              removeHashtag(hashtag?._id);
            }}
          >
            {hashtag?.name}
          </Tag>
        </span>
      );
    });
  };

  const InputView = () => {
    return (
      <div>
        {isAdding ? (
          <Input
            style={{ width: "30%" }}
            onPressEnter={handleInputConfirm}
            onBlur={handleInputConfirm}
            onChange={handleInputChange}
            autoFocus={true}
          ></Input>
        ) : (
          <Button className="green-button" onClick={() => setIsAdding(true)}>
            New hashtag
          </Button>
        )}
      </div>
    );
  };

  return (
    <Layout style={{ background: "white" }}>
      <Row>{TagItems()}</Row>
      <Row style={{ display: "inline-block", marginTop: 8 }}>
        {isLogin ? InputView() : <></>}
      </Row>
    </Layout>
  );
}

export default ProgrammingPane;
