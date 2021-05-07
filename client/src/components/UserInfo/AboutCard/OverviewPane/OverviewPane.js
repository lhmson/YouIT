import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import { updateUser } from "../../../../redux/actions/user";

const OverviewPane = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [dateOfBirth, setDateOfBirth] = useState(user?.userInfo?.dateOfBirth);
  const [address, setAddress] = useState(user?.userInfo?.address ?? "VietNam");
  const [workLocation, setWorkLocation] = useState(
    user?.userInfo?.workLocation ?? "VietNam"
  );
  // tai sao text change ma van chay console log o dau do
  // tai sao update db trong mongo roi ma load lai van lay VN
  console.log("adr: ", address);
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

  const saveSchool = () => {};

  const saveAddress = () => {
    const updatedUser = { ...user, userInfo: { ...user.userInfo, address } };
    console.log(updatedUser);
    dispatch(updateUser(updatedUser));
  };

  const saveWorkLocation = () => {};

  const saveGender = () => {};

  const saveBirthday = () => {};

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
        placeholder="Address"
        onChange={(value) => setAddress(value.target.value)}
        onSave={saveAddress}
      />
      <EditableText
        firstIcon={<MdLocationOn style={styles.icon} />}
        text={workLocation}
        placeholder="Work location"
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
