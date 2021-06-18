import React, { useState } from "react";
import OverviewRow from "../IntroCard/OverviewRow/OverviewRow.js";
import { useSelector } from "react-redux";

import {
  IoSchoolSharp,
  IoHome,
  MdLocationOn,
  FaMale,
  FaBirthdayCake,
  MdWork,
} from "react-icons/all";
import { Row, Typography } from "antd";
import styles from "./styles.js";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const { Header, Footer, Sider, Content } = Layout;

// function InfoCard() {
//   const [selectedItem, setSelectedItem] = useState("1");
const { Text } = Typography;
const IntroCard = () => {
  const user = useSelector((state) => state.user);

  const dateOfBirth = moment(user?.userInfo?.dateOfBirth).format("DD/MM/YYYY");
  const address = user?.userInfo?.address ?? "Viet Nam";
  const workLocation = user?.userInfo?.workLocation ?? "Viet Nam";
  const gender = user?.userInfo?.gender;
  // educations la array, coi lai
  const educations = user?.userInfo?.educations;
  const works = user?.userInfo?.works;

  let education;
  if (educations) {
    education = educations[educations.length - 1];
  }
  let work;
  if (works) {
    work = works[works.length - 1];
  }

  return (
    <Layout style={styles.backgroundheader}>
      <Row className="container">
        <Text style={styles.header}>Intro</Text>
      </Row>
      <div className="row" style={styles.lineinfo}>
        {work && (
          <OverviewRow
            firstIcon={<MdWork style={styles.icon} />}
            text={`${work?.position} at ${work?.location}`}
          />
        )}
        {education && (
          <OverviewRow
            firstIcon={<IoSchoolSharp style={styles.icon} />}
            text={`${education?.moreInfo} at ${education?.schoolName}`}
          />
        )}
        <OverviewRow
          firstIcon={<IoHome style={styles.icon} />}
          text={address}
        />
        <OverviewRow
          firstIcon={<MdLocationOn style={styles.icon} />}
          text={workLocation}
        />
        <OverviewRow firstIcon={<FaMale style={styles.icon} />} text={gender} />
        <OverviewRow
          firstIcon={<FaBirthdayCake style={styles.icon} />}
          text={dateOfBirth}
        />
      </div>

      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Button className="green-button" type="primary" style={styles.editBtn}>
          <Link to={`/userinfo/${user?._id}/about`}>Edit</Link>
        </Button>
      </Row>

      {/* <div className="row">
        <Button type="primary" style={styles.editinfo}>
          Edit
        </Button>
      </div> */}
    </Layout>
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
