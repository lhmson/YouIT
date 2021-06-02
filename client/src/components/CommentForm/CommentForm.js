import { Form, Input, Button, Select, Row, Space, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RequireLogin from "../RequireLogin/RequireLogin";
const { Text } = Typography;
const { TextArea } = Input;

const { Option } = Select;

const loggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.result?.name;
};

function CommentForm({ onSubmit, label, onDiscard, initContent }) {
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
    if (!inputComment) onSubmit({ content: initContent });
    onSubmit(inputComment);
    onReset();
  };

  return (
    <div>
      {loggedIn() ? (
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={handleFinish}
          requiredMark={false}
        >
          <Form.Item
            name="userComment"
            label={label}
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please write something.",
              },
            ]}
            initialValue={initContent}
          >
            <TextArea
              style={{ height: 200 }}
              onChange={(e) => setInputComment({ content: e.target.value })}
              value={inputComment}
              autoSize={{ minRows: 3, maxRows: 15 }}
            />
          </Form.Item>

          <Form.Item>
            <Row justify="end" align="middle">
              {onDiscard ? (
                <Text strong className="clickable mr-4" onClick={onDiscard}>
                  Discard
                </Text>
              ) : null}
              <Button
                htmlType="button"
                className="white-button mr-3"
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
      ) : (
        <RequireLogin restrictedAction="write a comment" />
      )}
    </div>
  );
}

export default CommentForm;
