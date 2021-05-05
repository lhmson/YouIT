import { Form, Input, Button, Select, Row, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const { TextArea } = Input;

const { Option } = Select;

function CommentForm({ setInputComment, inputComment, onSubmit }) {
  const [form] = Form.useForm();
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
    setInputComment({ content: "" });
  };

  const handleFinish = () => {
    onReset();
    onSubmit();
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
          <Button className="green-button" size="large" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default CommentForm;
