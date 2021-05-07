import { Form, Input, Button, Select, Row, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const { TextArea } = Input;

const { Option } = Select;

function CommentForm({ onSubmit }) {
  const [inputComment, setInputComment] = useState(null);
  const [errors, setErrors] = useState({});
  const [form] = Form.useForm();

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
    setInputComment({ content: "" });
  };

  const handleFinish = () => {
    onSubmit(inputComment);
    onReset();
  };
  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      onFinish={handleFinish}
    >
      <Form.Item name="userComment" label="Comment to this post">
        <TextArea
          style={{ height: 200 }}
          onChange={(e) => setInputComment({ content: e.target.value })}
          value={inputComment}
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
          <Button className="green-container" size="large" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default CommentForm;
