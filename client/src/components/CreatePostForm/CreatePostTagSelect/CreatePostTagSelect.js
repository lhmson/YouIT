import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHashtags } from "../../../redux/actions/hashtag.js";
import createPostStyle from "../styles.js"

import { Select } from "antd";
const { Option } = Select;


function CreatePostTagSelect({ onChange, defaultTags }) {
  const dispatch = useDispatch();
  /** @type {[]} */
  const listHashtags = useSelector(state => state.hashtags)?.filter(tag => tag?.name);

  useEffect(() => {
    dispatch(fetchHashtags());
  }, [dispatch])

  // list of hashtag's names
  // function handleChange(value) {
  //   console.log(`Selected: ${value}`);
  // }

  return (
    <>
      <Select
        mode="tags"
        // size={size}
        value={defaultTags}
        placeholder="# Hashtags"
        onChange={onChange}
        style={{ width: "100%", ...createPostStyle.editorFont }}
      >
        {listHashtags.map((tag, i) =>
          <Option
            key={tag?.name ?? i}
            style={createPostStyle.editorFont}
          >
            {tag?.name}
          </Option>)}
      </Select>
    </>
  );
}

export default CreatePostTagSelect;
