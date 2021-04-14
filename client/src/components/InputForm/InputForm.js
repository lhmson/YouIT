import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Checkbox, Upload, Typography } from "antd";
import styles from "./styles";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../redux/actions/posts";

const { Title, Text } = Typography;

const initialFieldValues = {
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};

function InputForm({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const selectedPost = useSelector((state) =>
    currentId ? state.posts.find((item) => item._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setPostData(selectedPost);
    }
  }, [selectedPost]);

  const validate = useCallback(() => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: postData.title ? "" : "Please input title",
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      message: postData.message ? "" : "Please input message",
    }));
    return Object.values(errors).every((x) => x === "");
  }, [postData]);

  useEffect(() => {
    validate();
  }, [validate]);

  const reset = () => {
    setCurrentId(null);
    setPostData(initialFieldValues);
    // form.resetFields();
  };

  const handleSubmit = (values) => {
    const isValid = validate();
    console.log(errors);
    if (isValid) {
      if (!currentId) {
        dispatch(createPost({ ...postData, creator: user?.result?.name }));
      } else {
        dispatch(
          updatePost(currentId, { ...postData, creator: user?.result?.name })
        );
      }
      reset();
    }

    console.log("Success:", values);
  };

  const handleFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const normFile = (e) => {
  //   console.log("Upload event:", e);

  //   if (Array.isArray(e)) {
  //     return e;
  //   }

  //   return e && e.fileList;
  // };

  if (!user?.result?.name) {
    return (
      <Title level="3" align="center">
        Please Sign In to create a post
      </Title>
    );
  }

  return (
    <Form
      {...styles.layout}
      autoComplete="off"
      noValidate
      name="basic"
      // initialValues={{}}
      onFinish={handleSubmit}
      onFinishFailed={handleFailed}
    >
      <Form.Item label="Title" required>
        <Input
          name="title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          suffix={errors.title + " "}
        />
      </Form.Item>

      <Form.Item label="Message" required>
        <Input
          name="message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          suffix={errors.message + " "}
        />
        {/* <Text type="danger">{errors.message}</Text> */}
      </Form.Item>

      {/* <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Pick an image"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item> */}

      <Form.Item className="justify-content-center">
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        />
      </Form.Item>

      {/* <Form.Item {...styles.tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item {...styles.tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={reset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}

export default InputForm;
