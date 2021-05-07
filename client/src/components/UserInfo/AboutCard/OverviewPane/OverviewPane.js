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

import styles from "./styles.js";
import EditableTimePeriod from "./EditableTimePeriod/EditableTimePeriod.js";
import EditableText from "./EditableText/EditableText.js";
import EditableCombobox from "./EditableCombobox/EditableCombobox.js";
import EditableTime from "./EditableTime/EditableTime.js";

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

  const genderOptions = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];

  return (
    <div>
      <EditableTimePeriod
        firstIcon={<IoSchoolSharp style={styles.icon} />}
        text="Went to Truong THPT Gia Dinh"
        subText="Attended from 2015 to 2018"
        placeholder="School"
      />
      <EditableText
        firstIcon={<IoHome style={styles.icon} />}
        text={address}
        placeholder="Current city"
      />
      <EditableText
        firstIcon={<MdLocationOn style={styles.icon} />}
        text={workLocation}
        placeholder="Hometown"
      />
      <EditableCombobox
        firstIcon={<FaMale style={styles.icon} />}
        text={user?.userInfo?.gender}
        subText="Gender"
        options={genderOptions}
      />
      <EditableTime
        firstIcon={<FaBirthdayCake style={styles.icon} />}
        text={dateOfBirth}
        subText="Birthday"
        lastIcon={<BsThreeDots style={styles.icon} />}
      />
    </div>
  );
};

export default OverviewPane;
