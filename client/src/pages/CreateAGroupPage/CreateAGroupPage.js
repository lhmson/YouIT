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
import CreateAGroupName from "../../components/CreateAGroup/CreataGroupName/CreateAGroupName.js";
import CreateAGroupDescription from "../../components/CreateAGroup/CreateAGroupDescription.js/CreateAGroupDescription.js.js";
import CreateGroupMembers from "../../components/CreateAGroup/CreateGroupMembers/CreateGroupMembers.js";
import styles from "./styles.js";

const { Title, Text } = Typography;

const initialState = {
  groupName: "",
};

const optionsPrivacy = ["Public", "Private"];
const optionsTopic = [
  "General",
  "Game",
  "Language",
  "Mobile",
  "Web Dev",
  "System",
  "Jobs",
  "Data",
  "School",
];

function CreateAGroupPage() {
  const user = useSelector((state) => state.user);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupPrivacy, setGroupPrivacy] = useState(optionsPrivacy[0]);
  const [groupTopic, setGroupTopic] = useState("");

  const [form, setForm] = useState(initialState);

  const dispatch = useDispatch();
  const history = useHistory();

  const wrapGroupData = () => {
    const result = {
      name: groupName,
      description: groupDescription,
      privacy: groupPrivacy,
      topic: groupTopic,
    };
    return result;
  };

  const handleSelectPrivacy = (selectedItems) => {
    const privacy = [];
    for (let i = 0; i < selectedItems.length; i++) {
      privacy.push(selectedItems[i].value);
    }
    setGroupPrivacy(privacy);
    setForm({ ...form, privacy: privacy });
  };

  const handleSelectTopic = (selectedItems) => {
    const topic = [];
    for (let i = 0; i < selectedItems.length; i++) {
      topic.push(selectedItems[i].value);
    }
    setGroupTopic(topic);
    setForm({ ...form, topic: topic });
  };

  const handleFinish = (values) => {
    const data = {};
    dispatch(createAGroup(data, history));
  };

  const displayName = user?.name ?? "Nguoi dung YouIT";

  const handleCreateAGroupButtonClick = () => {
    const newGroup = wrapGroupData();
    // createGroup(newGroup)
    //   .then((res) => history.push(`/post/${res.data._id}`)) // go to specific post
    //   .catch((error) => {
    //     alert("Something goes wrong");
    //     console.log(error);
    //   });
  };

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
                  {/* <Input
                    name="groupName"
                    placeholder="Group Name"
                    onChange={handleChange}
                  /> */}
                  <CreateAGroupName name={groupName} setName={setGroupName} />
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
                        value={groupPrivacy}
                        onChange={handleSelectPrivacy}
                        style={{ width: "100%" }}
                      >
                        {optionsPrivacy.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
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
                        value={groupTopic}
                        onChange={handleSelectTopic}
                        style={{ width: "100%" }}
                      >
                        {optionsTopic.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                      {/* <CreateAGroupTopicSelect /> */}
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="inviteFriends">
                  {/* <Input
                    name="inviteFriends"
                    placeholder="Invite your friends"
                  /> */}
                  <CreateGroupMembers />
                </Form.Item>
                <Form.Item name="description">
                  <CreateAGroupDescription
                    description={groupDescription}
                    setDescription={setGroupDescription}
                  />
                </Form.Item>
                <Form.Item style={{}}>
                  <Button
                    style={{ width: "100%" }}
                    className="green-button"
                    htmlType="submit"
                    onClick={handleCreateAGroupButtonClick}
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
                          {groupName}
                        </Text>
                        <Text style={{ fontSize: 16 }}>{groupPrivacy}</Text>
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
}

export default CreateAGroupPage;
