import React from "react";
import {
  Card,
  Avatar,
  Button,
  Typography,
  Row,
  Col,
  Tag,
  Space,
  Input,
  Divider,
} from "antd";
import {
  EllipsisOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LinkOutlined,
  ShareAltOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import styles from "./styles";
import COLOR from "../../constants/colors";

const { Title, Text, Paragraph, Link } = Typography;

function Comment(props) {
  const { comment: commentData } = props;
  const handleMore = () => {
    alert("more");
  };

  return (
    <div>
      <Row
        className="pb-2"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Row className="align-items-center" style={{ marginBottom: 12 }}>
          <Avatar
            className="ml-1 clickable"
            size={45}
            src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-1/p240x240/167274298_2791941774405213_2973980969027075470_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=QpKEyCIKuj0AX8HRcN6&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=96abb4f8e352f1223ecf465f760a78e8&oe=60A5BF59"
          />
          <div className="d-inline-flex flex-column ml-3">
            <Row style={{ alignItems: "center" }}>
              <Space size={4}>
                <Text
                  className="clickable"
                  strong
                  style={{ fontSize: "1.2rem" }}
                >
                  Quản Tiến Nghĩa
                </Text>
              </Space>
            </Row>
            <Text>Fullstack Developer</Text>
          </div>
        </Row>
        <Row className="justify-content-end align-items-center pb-3">
          <div className="mr-4">
            <Text className="clickable" underline type="secondary">
              Post 5 days ago
            </Text>
          </div>
          <div className="clickable" onClick={handleMore}>
            <EllipsisOutlined className="icon" />
          </div>
        </Row>
      </Row>
      <div className="p-4 mb-3" style={{ backgroundColor: COLOR.whiteSmoke }}>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <a className="black bold clickable" strong>
            {`Lương Lý Công Thắng's comment`}
          </a>
          <Text className="clickable" underline type="secondary">
            7 days ago
          </Text>
        </Row>
        <Paragraph style={{ color: COLOR.gray, marginBottom: 0 }}>
          Facade pattern có lẽ là pattern đơn giản nhất.
        </Paragraph>
        <br />
        <a className="clickable green bold" href="#" target="_blank" strong>
          See full comment
        </a>
      </div>
      <div className="pb-2">
        <Paragraph>{commentData?.content}</Paragraph>
      </div>
      <Row className="justify-content-between mb-4">
        <Row>
          <Space size="large">
            <Space>
              <ArrowUpOutlined className="clickable icon" />
              <Text strong>150</Text>
              <ArrowDownOutlined className="clickable icon" />
            </Space>
          </Space>
        </Row>
        <Row>
          <Space size="large">
            <LinkOutlined className="clickable icon" />
          </Space>
        </Row>
      </Row>
      <Divider />
    </div>
  );
}

export default Comment;
