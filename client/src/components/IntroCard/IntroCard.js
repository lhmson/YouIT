import React, { useState } from "react";
import OverviewRow from "../IntroCard/OverviewRow/OverviewRow.js";

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

  const AiFillHeartIcon = () => {
    return <AiFillHeart style={styles.icon} />;
  };

  return (
    <div style={styles.backgroundheader}>
      <div className="row">
        <Text style={styles.header}>Intro</Text>
      </div>
      <div className="row" style={styles.lineinfo}>
        <OverviewRow
          firstIcon={schoolIcon()}
          text="Went to Truong THPT Gia Dinh"
        />

        <OverviewRow
          firstIcon={homeIcon()}
          text="Lives in Ho Chi Minh City, Vietnam"
        />
        <OverviewRow
          firstIcon={<MdLocationOn style={styles.icon} />}
          text="From Ho Chi Minh City, Vietnam"
        />
        <OverviewRow
          firstIcon={schoolIcon()}
          text="Went to Truong THPT Gia Dinh"
        />
        <OverviewRow
          firstIcon={<AiFillHeart style={styles.icon} />}
          text="Single"
        />
        <OverviewRow
          firstIcon={<AiOutlineInstagram style={styles.icon} />}
          text="hellangel_kimthao_108"
        />
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
