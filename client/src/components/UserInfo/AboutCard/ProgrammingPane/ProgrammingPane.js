import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Input, Layout, Row, Select, Tag } from "antd";

import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.js";

import * as apiHashtag from "../../../../api/hashtag";
import * as apiUser from "../../../../api/user_info";
import { isLoginUser } from "../../../../utils/user.js";
import { fetchHashtags } from "../../../../redux/actions/hashtag.js";

const { Option } = Select;

function ProgrammingPane() {
  const user = useSelector((state) => state.user);
  const listHashtags = useSelector((state) => state.hashtags);

  const dispatch = useDispatch();
  const isLogin = isLoginUser(user);

  const [isAdding, setIsAdding] = useState(false);
  const [inputHashtags, setInputHashtags] = useState([]);
  const [listProgrammingHashtags, setListProgrammingHashtags] = useState([]);

  const fetchProgrammingHashtags = async () => {
    const hashtags = listHashtags.filter((tag) =>
      user?.userInfo?.programmingHashtags.includes(tag?._id)
    );
    setListProgrammingHashtags(hashtags);
  };

  useEffect(() => {
    dispatch(fetchHashtags());
  }, []);

  useEffect(() => {
    fetchProgrammingHashtags();
  }, [listHashtags]);

  const removeHashtag = async (removedHashtagId) => {
    // front
    const hashtags = listProgrammingHashtags.filter(
      (tag) => tag?._id !== removedHashtagId
    );
    setListProgrammingHashtags(hashtags);

    // back
    await apiUser.removeProgrammingHashtag(removedHashtagId);
    await apiHashtag.deleteHashtag(removedHashtagId);
  };

  const handleInputConfirm = async () => {
    const tagNames = listProgrammingHashtags.map((tag) => tag?.name);
    const addedHashtags = [];

    for (const hashtag of inputHashtags) {
      if (hashtag && tagNames.indexOf(hashtag) === -1) {
        // back
        const newHashtag = {
          name: hashtag,
        };
        const { data } = await apiHashtag.createHashtag(newHashtag);
        await apiUser.addProgrammingHashtag(data?._id);

        // front
        addedHashtags.push(data);
      }
    }
    setListProgrammingHashtags([...listProgrammingHashtags, ...addedHashtags]);
    setIsAdding(false);
    setInputHashtags([]);
  };

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  const TagItems = () => {
    return listProgrammingHashtags.map((hashtag) => {
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
          <Col>
            <Select
              mode="tags"
              placeholder="Select hashtags"
              onChange={setInputHashtags}
              style={{ width: "90%" }}
            >
              {listHashtags.map((tag, i) => (
                <Option key={tag?.name ?? i}>{tag?.name}</Option>
              ))}
            </Select>
            <Row>
              <Button
                className="green-button"
                style={styles.button}
                onClick={handleInputConfirm}
              >
                Save
              </Button>
              <Button style={styles.button} onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </Row>
          </Col>
        ) : (
          <Button className="green-button" onClick={() => setIsAdding(true)}>
            New hashtag
          </Button>
        )}
      </div>
    );
  };

  return (
    <Layout style={{ background: "white", marginLeft: 24 }}>
      <Row>{TagItems()}</Row>
      <Row style={{ display: "inline-block", marginTop: 8 }}>
        {isLogin ? InputView() : <></>}
      </Row>
    </Layout>
  );
}

export default ProgrammingPane;
