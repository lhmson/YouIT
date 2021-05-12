import React, { useState } from "react";
import OverviewRow from "../IntroCard/OverviewRow/OverviewRow.js";
import { useSelector } from "react-redux";

import {
  IoSchoolSharp,
  IoHome,
  MdLocationOn,
  FaMale,
  FaBirthdayCake,
} from "react-icons/all";
import { Typography } from "antd";
import styles from "./styles.js";
import { Layout } from "antd";
import moment from "moment";

const { Content } = Layout;
// function InfoCard() {
//   const [selectedItem, setSelectedItem] = useState("1");
const { Text } = Typography;
const IntroCard = () => {
  const user = useSelector((state) => state.user);

  const dateOfBirth = moment(user?.userInfo?.dateOfBirth).format("DD/MM/YYYY");
  const address = user?.userInfo?.address ?? "Quang Nam, Viet Nam";
  const workLocation = user?.userInfo?.workLocation ?? "Quang Nam, Viet Nam";
  const gender = user?.userInfo?.gender;
  // educations la array, coi lai
  const education =
    user?.userInfo?.education ?? "Trường ĐH Công nghệ Thông tin";
  return (
    <div style={styles.backgroundheader}>
      <div className="row">
        <Text style={styles.header}>Intro</Text>
      </div>
      <div className="row" style={styles.lineinfo}>
        <OverviewRow
          firstIcon={<IoSchoolSharp style={styles.icon} />}
          text={education}
        />
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
      {/* <div className="row">
        <Button type="primary" style={styles.editinfo}>
          Edit
        </Button>
      </div> */}
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
