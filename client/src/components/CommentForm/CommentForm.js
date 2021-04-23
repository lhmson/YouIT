import { Form, Input, Button, Select, Row, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/comments";
const { TextArea } = Input;

const { Option } = Select;

function CommentForm({ postId, onSubmit }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [commentData, setCommentData] = useState(null);
  const [errors, setErrors] = useState({});
  // const validate = useCallback(() => {
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     title: commentData?.content ? "" : "Please input content",
  //   }));
  //   return Object.values(errors).every((x) => x === "");
  // }, [commentData]);

  // useEffect(() => {
  //   validate();
  // }, [validate]);

  const onReset = () => {
    form.resetFields();
    setCommentData(null);
  };

  const handleSubmit = () => {
    console.log("submit");
    //const isValid = validate();
    if (1) {
      dispatch(
        createComment(postId, { ...commentData }, () => {
          onSubmit();
          onReset();
        })
      );
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      onFinish={handleSubmit}
    >
      <Form.Item name="userComment" label="Comment to this post">
        <TextArea
          style={{ height: 200 }}
          onChange={(e) =>
            setCommentData({ ...commentData, content: e.target.value })
          }
          value={commentData}
        />
      </Form.Item>

      <Form.Item>
        <Row justify="end">
          <btn
            htmlType="button"
            className="mr-3"
            size="large"
            onClick={onReset}
          >
            Reset
          </btn>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default CommentForm;
