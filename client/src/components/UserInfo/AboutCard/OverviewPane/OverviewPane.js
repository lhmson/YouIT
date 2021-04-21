import React from "react";

import {
  IoSchoolSharp,
  IoHome,
  MdPublic,
  BsThreeDots,
  MdLocationOn,
  FaMale,
  FaBirthdayCake,
} from "react-icons/all";

import OverviewRow from "../OverviewRow/OverviewRow.js";
import styles from "./styles.js";

const OverviewPane = (props) => {
  const schoolIcon = () => {
    return <IoSchoolSharp style={styles.icon} />;
  };
  const homeIcon = () => {
    return <IoHome style={styles.icon} />;
  };
  const publicIcon = () => {
    return <MdPublic style={styles.icon} />;
  };

  return (
    <div>
      <OverviewRow
        firstIcon={schoolIcon()}
        text="Went to Truong THPT Gia Dinh"
        subText="Attended from 2015 to 2018"
        privacyIcon={publicIcon()}
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
      <OverviewRow
        firstIcon={homeIcon()}
        text="Lives in Ho Chi Minh City, Vietnam"
        privacyIcon={publicIcon()}
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
      <OverviewRow
        firstIcon={<MdLocationOn style={styles.icon} />}
        text="From Ho Chi Minh City, Vietnam"
        privacyIcon={publicIcon()}
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
      <OverviewRow
        firstIcon={<FaMale style={styles.icon} />}
        text="Male"
        subText="Gender"
        privacyIcon={publicIcon()}
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
      <OverviewRow
        firstIcon={<FaBirthdayCake style={styles.icon} />}
        text="04/21/2021"
        subText="Birthday"
        privacyIcon={publicIcon()}
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
    </div>
  );
};

export default OverviewPane;
