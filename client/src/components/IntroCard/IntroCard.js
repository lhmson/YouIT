import React, { useState } from "react";
import OverviewRow from "../IntroCard/OverviewRow/OverviewRow.js";
import { useSelector } from "react-redux";

import {
  IoSchoolSharp,
  IoHome,
  MdPublic,
  MdLocationOn,
  AiFillHeart,
  AiOutlineInstagram,
  AiFillInstagram,
} from "react-icons/all";
import { Form, Input, Button, Checkbox, Upload, Typography } from "antd";
import styles from "./styles.js";
import { Layout } from "antd";
import { Link } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;
// function InfoCard() {
//   const [selectedItem, setSelectedItem] = useState("1");
const { Title, Text } = Typography;
const IntroCard = (props) => {
  const schoolIcon = () => {
    return <IoSchoolSharp style={styles.icon} />;
  };
  const homeIcon = () => {
    return <IoHome style={styles.icon} />;
  };

  const user = useSelector((state) => state.user);

  const dateOfBirth = user?.userInfo?.dateOfBirth;
  const address = user?.userInfo?.address ?? "Quang Nam, Viet Nam";
  const workLocation = user?.userInfo?.workLocation ?? "Quang Nam, Viet Nam";
  const Education =
    user?.userInfo?.Education ?? "Trường ĐH Công nghệ Thông tin";
  return (
    <div style={styles.backgroundheader}>
      <div className="row">
        <Text style={styles.header}>Intro</Text>
      </div>
      <div className="row" style={styles.lineinfo}>
        <OverviewRow
          firstIcon={<IoSchoolSharp style={styles.icon} />}
          text={Education}
        />
        <OverviewRow
          firstIcon={<IoSchoolSharp style={styles.icon} />}
          text={Education}
        />
        <OverviewRow
          firstIcon={<MdLocationOn style={styles.icon} />}
          text={workLocation}
        />
        <OverviewRow
          firstIcon={<MdLocationOn style={styles.icon} />}
          text={workLocation}
        />
        <OverviewRow
          firstIcon={<AiFillHeart style={styles.icon} />}
          text={workLocation}
        />
        <OverviewRow
          firstIcon={<AiOutlineInstagram style={styles.icon} />}
          text={workLocation}
        />
      </div>
      <div className="row">
        <Link to="/userinfo/about">
          <Button type="primary" style={styles.editinfo}>
            Edit
          </Button>
        </Link>
      </div>
    </div>
    // <Layout style={{ backgroundColor: "white", width: 350, height: 350 }}>
    //   <Header>
    //     <Text style={{ fontSize: 28, fontWeight: 600, marginLeft: 30 }}>
    //       Intro
    //     </Text>
    //   </Header>
    //   <Content>Content</Content>
    //   <Footer>Footer</Footer>
    // </Layout>
  );
};

export default IntroCard;
