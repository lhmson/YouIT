import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Upload, Typography } from "antd";
import styles from "./styles";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../redux/actions/posts";

const { Title, Text } = Typography;

function InputForm({ currentId, setCurrentId }) {
  const [form] = Form.useForm();

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((item) => item._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const reset = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    // form.resetFields();
  };

  const handleSubmit = (values) => {
    if (!currentId) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
    }
    reset();

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

  return (
    <Form
      {...styles.layout}
      autoComplete="off"
      noValidate
      name="basic"
      initialValues={{}}
      form={form}
      onFinish={handleSubmit}
      onFinishFailed={handleFailed}
    >
      <Form.Item
        label="Title"
        rules={[
          {
            required: true,
            message: "Please input title!",
          },
        ]}
      >
        <Input
          name="title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="Message"
        rules={[
          {
            required: true,
            message: "Please input message!",
          },
        ]}
      >
        <Input
          name="message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Creator">
        <Input
          name="creator"
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
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
