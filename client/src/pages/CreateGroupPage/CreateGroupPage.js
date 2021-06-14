import React, { useState } from "react";
import {
  Card,
  Row,
  Typography,
  Button,
  Col,
  Form,
  Layout,
  Select,
  Divider,
  message,
} from "antd";
import COLOR from "../../constants/colors.js";
import { useHistory } from "react-router";
import { createGroup } from "../../api/group";
import CoverPhoto from "../../components/CreateGroup/CoverPhoto/CoverPhoto.js";
import Navbar from "../../components/Navbar/Navbar";
import CreateGroupName from "../../components/CreateGroup/CreateGroupName/CreateGroupName";
import CreateGroupDescription from "../../components/CreateGroup/CreateGroupDescription/CreateGroupDescription";
import CreateGroupMembers from "../../components/CreateGroup/CreateGroupMembers/CreateGroupMembers";
import { OverviewRow } from "../../components/UserInfo/AboutCard/index.js";
import { IoMdLock } from "react-icons/all";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import CreateGroupNameAdmin from "../../components/CreateGroup/CreateGroupNameAdmin/CreateGroupNameAdmin.js";

import styles from "./styles.js";

const { Title, Text } = Typography;

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

function CreateGroupPage() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupPrivacy, setGroupPrivacy] = useState("Public");
  const [groupTopic, setGroupTopic] = useState("General");
  const [groupMembers, setGroupMembers] = useState();

  const [user] = useLocalStorage("user");

  // const dispatch = useDispatch();
  const history = useHistory();

  const Data = () => {
    const result = {
      name: groupName,
      description: groupDescription,
      privacy: groupPrivacy,
      topic: groupTopic,
      listMembers: groupMembers,
    };
    return result;
  };

  const handleSelectPrivacy = (selectedItems) => {
    setGroupPrivacy(selectedItems);
  };

  const handleSelectTopic = (selectedItems) => {
    setGroupTopic(selectedItems);
  };

  const handleCreateGroupButtonClick = () => {
    const newGroup = Data();
    createGroup(newGroup)
      .then((res) => history.push(`/group/${res.data._id}`))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFinishFailed = (errorInfo) => {
    // errorInfo.errorFields.map((err) => {
    //   message.error(err.errors[0]);
    // });
  };

  const privacyDescription =
    "Anyone can see who's in the group and what they post.";

  const publicDescription =
    "Anyone can see who's in the group and what they post.";

  const PrivateIcon = () => {
    return <IoMdLock style={styles.icon} />;
  };

  const PublicIcon = () => {
    return <IoMdLock style={styles.icon} />;
  };

  const onSelectedGroupMembersChange = (value) => {
    setGroupMembers(
      value.map((memberId) => ({ userId: memberId, role: "Member" }))
    );
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
                <CreateGroupNameAdmin />
                {/* <AvatarView /> */}
              </Row>
              <Form
                style={{ marginTop: 40 }}
                name="basic"
                size="large"
                // onFinish={handleFinish}
                // onFinishFailed={handleFinishFailed}
              >
                <Form.Item
                  name="groupName"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Group name is required.",
                  //   },
                  // ]}
                >
                  <CreateGroupName name={groupName} setName={setGroupName} />
                </Form.Item>

                <Row gutter={8}>
                  <Col span={10}>
                    {" "}
                    <Form.Item
                      name="groupPrivacyItem"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Privacy is required.",
                      //   },
                      // ]}
                    >
                      <Select
                        placeholder="Privacy"
                        defaultValue="Public"
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
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Topic is required.",
                      //   },
                      // ]}
                    >
                      <Select
                        placeholder="Topic"
                        name="Topic"
                        value={groupTopic}
                        onChange={handleSelectTopic}
                        style={{ width: "100%" }}
                        defaultValue="General"
                      >
                        {optionsTopic.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="inviteFriends">
                  {/* <Input
                    name="inviteFriends"
                    placeholder="Invite your friends"
                  /> */}
                  <CreateGroupMembers onChange={onSelectedGroupMembersChange} />
                </Form.Item>
                <Form.Item name="description">
                  <CreateGroupDescription
                    description={groupDescription}
                    setDescription={setGroupDescription}
                  />
                </Form.Item>
                <Form.Item style={{}}>
                  <Button
                    style={{ width: "100%" }}
                    className="green-button"
                    htmlType="submit"
                    onClick={handleCreateGroupButtonClick}
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
                    <Title
                      style={{ marginBottom: 8, marginTop: 8, fontSize: 20 }}
                    >
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
                          {groupName != "" ? groupName : "Group Name"}
                        </Text>
                        <Text style={{ fontSize: 18 }}>
                          {" "}
                          {groupPrivacy != "" ? groupPrivacy : "Privacy"}
                        </Text>
                      </Layout>
                    </Col>
                  </Row>
                  <Layout
                    style={{
                      marginBottom: 32,
                      padding: 16,
                      background: "white",
                    }}
                  >
                    <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                      About this group
                    </Text>
                    <Layout style={{ paddingLeft: 32, background: "white" }}>
                      <Divider style={{ justifySelf: "start" }}></Divider>
                      <Text>{groupDescription}</Text>
                      <Row>
                        <OverviewRow
                          firstIcon={
                            groupPrivacy == "Public" ? (
                              <PrivateIcon />
                            ) : (
                              <PublicIcon />
                            )
                          }
                          text={groupPrivacy != "" ? groupPrivacy : "Privacy"}
                          subText={
                            groupPrivacy == "Public"
                              ? publicDescription
                              : privacyDescription
                          }
                        />
                        <OverviewRow />
                        {/* <OverviewRow
                          firstIcon={<ShopOutlined />}
                          text="Topic"
                          subText={groupTopic != "" ? groupTopic : "Topic"}
                        />
                        <OverviewRow /> */}
                      </Row>
                    </Layout>
                  </Layout>
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

export default CreateGroupPage;
