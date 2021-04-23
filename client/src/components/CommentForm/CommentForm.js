import { Form, Input, Button, Select, Row, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/comments";
const { TextArea } = Input;

const { Option } = Select;

function CommentForm(props) {
  const { postId } = props;
  const [form] = Form.useForm();

  const [commentData, setCommentData] = useState(null);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const validate = useCallback(() => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: commentData?.content ? "" : "Please input content",
    }));
    return Object.values(errors).every((x) => x === "");
  }, [commentData]);

  useEffect(() => {
    validate();
  }, [validate]);

  const onReset = () => {
    setCommentData(null);
  };

  const handleSubmit = () => {
    const isValid = validate();
    console.log(errors);
    if (isValid) {
      dispatch(createComment(postId, { ...commentData }));

      onReset();
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      onFinish={handleSubmit}
    >
      <Form.Item name="userComment" label="Your comment">
        <TextArea
          style={{ height: 200 }}
          onChange={(e) =>
            setCommentData({ ...commentData, content: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <Row justify="end">
          <Button
            htmlType="button"
            className="mr-3"
            size="large"
            onClick={onReset}
          >
            Reset
          </Button>
          <Button className="green-button" size="large" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default CommentForm;
