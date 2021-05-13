import React, { useState } from "react";
import {
  Card,
  Input,
  Avatar,
  Row,
  Typography,
  Button,
  Col,
  Form,
  Select,
  Layout,
  Menu,
} from "antd";
import { Link } from "react-router-dom";
import COLOR from "../../constants/colors.js";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createAGroup } from "../../redux/actions/group";
import { Option } from "antd/lib/mentions";
import { CoverPhoto, GroupAboutCard } from "../../components/index.js";
import { BsThreeDots } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { MailOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./styles.js";

const { Title, Text } = Typography;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};

const initialState = {
  groupName: "",
};

// function CreateAGroupPage() {
const CreateAGroupPage = () => {
  const user = useSelector((state) => state.user);

  const [form, setForm] = useState(initialState);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setForm({ ...form, [e?.target.groupname]: e?.target.value });
  };

  const handleChangeDescription = (e) => {
    setForm({ ...form, [e?.target.description]: e?.target.value });
  };

  const handleChangePrivacy = (value) => {
    setForm({ ...form, privacy: value });
  };

  const handleChangeTopic = (value) => {
    setForm({ ...form, topic: value });
  };

  const handleFinish = (values) => {
    const data = {};
    dispatch(createAGroup(data, history));
  };

  const displayName = user?.name ?? "Nguoi dung YouIT";

  return (
    <Layout>
      <Navbar />
      <div
        //    className="full d-flex align-items-center justify-content-center"
        style={{ backgroundColor: COLOR.white, marginTop: 60 }}
      >
        <Row style={{ justifyContent: "center" }}> </Row>
        <Card className="shadow-lg rounded" bordered={false}>
          <Row>
            <Col span={8} style={{ paddingRight: 24, marginBottom: 0 }}>
              <Row>
                <Title style={{ marginBottom: 8 }}>Create a group</Title>
              </Row>
              <Row style={{ marginBottom: 18, marginTop: 18 }}>
                <Link to="/">
                  <Avatar
                    src="https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/179048033_1139396113169332_2102843025754757575_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=plNrtGcVUs8AX-qL0nd&_nc_ht=scontent-hkg4-2.xx&oh=9ec720ace0503fae288080f97a649df2&oe=60B9683D"
                    alt="avatar"
                    className="ml-1 clickable"
                    size={80}
                  />
                </Link>
                <Layout style={{ background: COLOR.white }}>
                  <Text
                    className="clickable"
                    strong
                    style={{ marginLeft: 15, fontSize: "1.8rem" }}
                  >
                    {displayName}
                  </Text>
                  <Text style={{ marginLeft: 15, fontSize: 16 }}>Admin</Text>
                </Layout>
              </Row>
              <Form
                style={{ marginTop: 40 }}
                name="basic"
                size="large"
                onFinish={handleFinish}
                // onFinishFailed={handleFinishFailed}
              >
                <Form.Item
                  name="groupName"
                  rules={[
                    {
                      required: true,
                      message: "Group name is required.",
                    },
                  ]}
                >
                  <Input
                    name="groupName"
                    placeholder="Group Name"
                    onChange={handleChange}
                  />
                </Form.Item>

                <Row gutter={8}>
                  <Col span={10}>
                    {" "}
                    <Form.Item
                      name="privacy"
                      rules={[
                        {
                          required: true,
                          message: "Privacy is required.",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Privacy"
                        name="privacy"
                        onChange={handleChangePrivacy}
                        style={{ width: "100%" }}
                      >
                        <Option value="Public">Public</Option>
                        <Option value="Private">Private</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item
                      name="topic"
                      rules={[
                        {
                          required: true,
                          message: "Topic is required.",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Topic"
                        name="Topic"
                        onChange={handleChangeTopic}
                        style={{ width: "100%" }}
                      >
                        <Option value="General"> General</Option>
                        <Option value="Game">Game</Option>
                        <Option value="Language">Language</Option>
                        <Option value="Mobile">Mobile</Option>
                        <Option value="Web Dev">Web Dev</Option>
                        <Option value="System">System</Option>
                        <Option value="Jobs">Jobs</Option>
                        <Option value="Data">Data</Option>
                        <Option value="School">School</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="inviteFriends">
                  <Input
                    name="inviteFriends"
                    placeholder="Invite your friends"
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item name="description">
                  <Input
                    name="description"
                    placeholder="Description"
                    onChange={handleChangeDescription}
                    style={{ height: 150 }}
                  />
                </Form.Item>
                <Form.Item style={{}}>
                  <Button
                    style={{ width: "100%" }}
                    className="green-button"
                    htmlType="submit"
                  >
                    Create a group
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={16} style={{ marginTop: 0 }}>
              <div style={{ marginLeft: 10 }}>
                <Layout className="container">
                  <Row>
                    <Title style={{ marginBottom: 8, fontSize: 20 }}>
                      Preview
                    </Title>
                  </Row>
                  <CoverPhoto />
                  <Row style={{ display: "flex", flexDirection: "row" }}>
                    <Col span={12}>
                      <Layout style={{ marginBottom: 32 }}>
                        <Text
                          style={{ fontSize: 40, fontWeight: "bold" }}
                          placeholder="Group Name"
                        >
                          Group Name
                        </Text>
                        <Text style={{ fontSize: 16 }}>Public group</Text>
                      </Layout>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <Menu mode="horizontal" style={{ marginBottom: 10 }}>
                        <Menu.Item key="post" icon={<MailOutlined />}>
                          Post
                        </Menu.Item>

                        <Menu.Item key="about" icon={<MailOutlined />}>
                          About
                        </Menu.Item>
                      </Menu>
                    </Col>
                    <Col span={16}></Col>
                    <Col span={2} style={{ marginRight: 0 }}>
                      <GoSearch size={24} style={styles.icon} />
                      <BsThreeDots size={24} style={styles.icon} />
                    </Col>
                  </Row>
                  <GroupAboutCard />
                </Layout>
              </div>
            </Col>
          </Row>
        </Card>
        {/* </div> */}
      </div>
    </Layout>
  );
};

export default CreateAGroupPage;
