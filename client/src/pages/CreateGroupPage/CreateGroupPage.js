import React, { useState, useRef } from "react";
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
  Image,
} from "antd";
import COLOR from "../../constants/colors.js";
import { useHistory } from "react-router";
import { createGroup } from "../../api/group";
import Navbar from "../../components/Navbar/Navbar";
import * as apiUpload from "../../api/upload";
import CreateGroupName from "../../components/CreateGroup/CreateGroupName/CreateGroupName";
import CreateGroupDescription from "../../components/CreateGroup/CreateGroupDescription/CreateGroupDescription";
import CreateGroupMembers from "../../components/CreateGroup/CreateGroupMembers/CreateGroupMembers";
import { IoMdLock } from "react-icons/all";
import CreateGroupNameAdmin from "../../components/CreateGroup/CreateGroupNameAdmin/CreateGroupNameAdmin.js";
import { convertFileToBase64 } from "../../utils/image.js";
import styles from "./styles.js";
import { useGroupsOfUser } from "../../context/GroupsOfUserContext.js";
import { createFormData } from "../../utils/upload.js";

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
  const groupsOfUser = useGroupsOfUser();

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupPrivacy, setGroupPrivacy] = useState("Public");
  const [groupTopic, setGroupTopic] = useState("General");
  const [groupMembers, setGroupMembers] = useState();
  const [groupCover, setGroupCover] = useState(
    "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.15752-9/120898995_347531066521259_6824380020926465874_n.png?_nc_cat=105&ccb=1-3&_nc_sid=ae9488&_nc_ohc=QbdFIeieLjgAX9JoQuk&_nc_oc=AQkDKJjz25pmirjN94vzbtmnSQbPgaqusZRGj5cSBu43xvQoaNLPtyBDG5HPRoexCQuO0lNStfofFNQaJj6SdCVa&_nc_ht=scontent.fsgn4-1.fna&oh=ab92bec342d2a85297dc6d3bf6a01cbb&oe=60D9E6AC"
  );
  const history = useHistory();

  const Data = () => {
    const result = {
      name: groupName,
      description: groupDescription,
      privacy: groupPrivacy,
      topic: groupTopic,
      listMembers: groupMembers,
      backgroundUrl: groupCover,
    };
    return result;
  };

  const handleSelectPrivacy = (selectedItems) => {
    setGroupPrivacy(selectedItems);
  };

  const handleSelectTopic = (selectedItems) => {
    setGroupTopic(selectedItems);
  };

  const handleCreateGroupButtonClick = async () => {
    const newGroup = Data();
    createGroup(newGroup)
      .then((res) => {
        groupsOfUser.addGroup(res.data);
        history.push(`/group/${res.data._id}/main`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUploadPhoto = async (img, type) => {
    const data = createFormData(img);

    try {
      const res = await apiUpload.uploadImage(data, type);

      if (res) {
        return res.data.data.avatar;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error when upload img", error.message);
    }
  };

  const hiddenBackgroundInput = useRef(null);

  const handleBackgroundChange = async (e) => {
    const fileUploaded = e.target.files[0];
    // const base64 = await convertFileToBase64(fileUploaded);

    const resBackground = await handleUploadPhoto(fileUploaded, "group");
    // console.log("res ava", resBackground);

    if (!resBackground) {
      message.error("Cannot upload image");
      return;
    }

    setGroupCover(resBackground);
  };

  const privacyDescription =
    "Anyone can see who's in the group and what they post.";

  const publicDescription =
    "Only group members can see who's in the group and what they post. .";

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
              <Title style={{ marginBottom: 20 }}>Create a group</Title>
              <CreateGroupNameAdmin />
              <Form
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
                  {/* <CoverPhoto /> */}
                  <div style={{ position: "relative" }}>
                    <Layout
                      style={{
                        position: "relative",
                        height: "40vh",
                        marginBottom: 32,
                      }}
                    >
                      <Image
                        src={groupCover}
                        style={{
                          maxHeight: "40vh",
                          width: "100%",
                          objectFit: "cover",
                          height: "auto",
                          display: "block",
                        }}
                      ></Image>
                      <div>
                        <Button
                          className="green-button"
                          style={styles.editImageBtn}
                          onClick={() => hiddenBackgroundInput.current.click()}
                        >
                          Add cover photo
                        </Button>
                        <input
                          type="file"
                          ref={hiddenBackgroundInput}
                          style={{ display: "none" }}
                          onChange={handleBackgroundChange}
                        ></input>
                      </div>
                    </Layout>
                  </div>
                  <Row style={{ display: "flex", flexDirection: "row" }}>
                    <Col
                      style={{
                        marginBottom: 32,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontSize: 40, fontWeight: "bold" }}
                        placeholder="Group Name"
                      >
                        {groupName !== "" ? groupName : "Group Name"}
                      </Text>
                      <Text style={{ fontSize: 18 }}>{groupPrivacy}</Text>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {`#${groupTopic}`}
                      </Text>
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
                      <Text style={{ fontSize: 18 }}>{groupDescription}</Text>
                      {/* <Row>
                        <OverviewRow
                          firstIcon={
                            groupPrivacy === "Public" ? (
                              <PrivateIcon />
                            ) : (
                              <PublicIcon />
                            )
                          }
                          text={groupPrivacy !== "" ? groupPrivacy : "Privacy"}
                          subText={
                            groupPrivacy === "Public"
                              ? publicDescription
                              : privacyDescription
                          }
                        />
                        <OverviewRow />
                      </Row> */}
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
