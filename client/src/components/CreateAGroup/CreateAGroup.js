import React from "react";
import {
  Layout,
  Input,
  Avatar,
  Row,
  Space,
  Typography,
  Radio,
  Button,
  Col,
  Image,
} from "antd";
import styles from "./styles.js";
import PrivacyDropDown from "../PrivacyDropDown/PrivacyDropDown.js";
import TopicDropDown from "../TopicDropDown/TopicDropDown.js";
import { Link } from "react-router-dom";
import COLOR from "../../constants/colors.js";

const { Sider } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};

function CreateAGroup() {
  return (
    <Layout>
      <Col
        // width={400}
        style={{
          width: 400,
          ...styles.paleBackground,
          ...styles.fixedSider,
        }}
      >
        <Text style={styles.header}>Create A Group</Text>
        <Row
          className="align-items-center"
          style={{ marginLeft: 30, marginTop: 15 }}
        >
          <Avatar
            className="ml-1 clickable"
            size={80}
            src="https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/179048033_1139396113169332_2102843025754757575_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=plNrtGcVUs8AX-qL0nd&_nc_ht=scontent-hkg4-2.xx&oh=9ec720ace0503fae288080f97a649df2&oe=60B9683D"
          />
          <div className="d-inline-flex flex-column ml-3">
            <Row style={{ alignItems: "center" }}>
              <Space>
                <Link to="/wall">
                  <Text
                    className="clickable"
                    strong
                    style={{ fontSize: "1.5rem" }}
                  >
                    Thy Thy cute
                  </Text>
                </Link>
              </Space>
            </Row>
            <Text>Admin</Text>
          </div>
        </Row>
        <Row style={{ marginLeft: 15 }}>
          <Input
            placeholder="Group Name"
            style={{
              marginLeft: 30,
              marginTop: 30,
              width: 300,
              height: 50,
              fontSize: 20,
            }}
          />
          <PrivacyDropDown></PrivacyDropDown>
          {/* <Radio.Group
          name="radiogroup"
          defaultValue={1}
          style={{
            margin: 30,
            width: 300,
          }}
        >
          <Radio value={1}>Public</Radio>
          <Radio value={2}>Private</Radio>
        </Radio.Group> */}
          <Input
            placeholder="Invite Your Friends"
            style={{
              marginLeft: 30,
              width: 300,
              height: 50,
              fontSize: 20,
            }}
          />
          <TopicDropDown></TopicDropDown>

          <TextArea
            placeholder="Invite Your Friends"
            showCount
            maxLength={1000}
            onChange={onChange}
            style={{
              marginLeft: 30,
              width: 300,
              fontSize: 20,
            }}
          />
        </Row>
        <Row>
          <Link to="/userinfo/about">
            <Button
              type="primary"
              style={{ marginLeft: 100, marginTop: 30, width: 200 }}
            >
              Create a group
            </Button>
          </Link>
        </Row>
      </Col>
      <Col
        style={{
          ...styles.Preview,
          height: 700,
          marginTop: 50,
        }}
      >
        <Row style={{ height: 35 }}>
          <Text style={styles.headerPreview}>Preview </Text>
        </Row>

        <Row style={{ background: COLOR.gray, height: 665 }}>
          <Row style={{ height: 300 }}>
            <Image
              src="https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.6435-9/163235666_1115796115529332_6821831263588910777_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=e3f864&_nc_ohc=WvP-Nry623AAX-a7FO_&_nc_ht=scontent.fsgn1-1.fna&oh=afcb79d87193478e98ea1c17c4e273ca&oe=60C02E42"
              style={{
                maxHeight: "40vh",
                width: "100%",
                objectFit: "cover",
                height: "auto",
                display: "block",
                padding: 20,
              }}
            ></Image>
          </Row>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginLeft: 30,
            }}
          >
            Create A Group
          </Text>
          <Row style={{ height: 10, background: "green" }}>
            {/* <Text
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginLeft: 30,
              }}
            >
              Create A Group
            </Text> */}
          </Row>
        </Row>
      </Col>

      {/* <Sider
        width={1050}
        style={{
          ...styles.Background,
          ...styles.fixedLayout,
        }}
      ></Sider> */}
    </Layout>
  );
}

export default CreateAGroup;
