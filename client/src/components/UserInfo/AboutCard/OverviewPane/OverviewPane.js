import React from "react";
import { useSelector } from "react-redux";

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

const OverviewPane = () => {
  const user = useSelector((state) => state.user);

  const dateOfBirth = user?.userInfo?.dateOfBirth;
  const address = user?.userInfo?.address ?? "VietNam";
  const workLocation = user?.userInfo?.workLocation ?? "VietNam";
  // const dateOfBirth = {
  //   $convert: {
  //     input: user?.userInfo?.dateOfBirth,
  //     to: "date",
  //   },
  // };
  //const dateOfBirth = Number(moment(d).tz(timezone).format("YYYYMMDD"));

  return (
    <div>
      <OverviewRow
        firstIcon={<IoSchoolSharp style={styles.icon} />}
        text="Went to Truong THPT Gia Dinh"
        subText="Attended from 2015 to 2018"
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
      <OverviewRow
        firstIcon={<IoHome style={styles.icon} />}
        text={address}
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
      <OverviewRow
        firstIcon={<MdLocationOn style={styles.icon} />}
        text={workLocation}
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
      <OverviewRow
        firstIcon={<FaMale style={styles.icon} />}
        text={user?.userInfo?.gender}
        subText="Gender"
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
      <OverviewRow
        firstIcon={<FaBirthdayCake style={styles.icon} />}
        text={dateOfBirth}
        subText="Birthday"
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
    </div>
  );
};

export default OverviewPane;
