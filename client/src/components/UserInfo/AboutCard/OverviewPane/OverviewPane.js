import React, { useEffect, useState } from "react";
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
import moment from "moment";

import styles from "./styles.js";
import EditableTimePeriod from "./EditableTimePeriod/EditableTimePeriod.js";
import EditableText from "./EditableText/EditableText.js";
import EditableCombobox from "./EditableCombobox/EditableCombobox.js";
import EditableTime from "./EditableTime/EditableTime.js";

import { updateUser } from "../../../../redux/actions/user";

const OverviewPane = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // before: 2021-04-27T07:39:23.250+00:00
  // after:  2021-04-27
  const [dateOfBirth, setDateOfBirth] = useState(
    moment(user?.userInfo?.dateOfBirth).format("DD/MM/YYYY")
  );

  //console.log("ua ", user?.userInfo?.address);
  const [address, setAddress] = useState(user?.userInfo?.address ?? "VietNam");
  //console.log("adr: ", address);

  const [workLocation, setWorkLocation] = useState(
    user?.userInfo?.workLocation ?? "VietNam"
  );

  const [gender, setGender] = useState(user?.userInfo?.gender);

  useEffect(() => {
    setAddress(user?.userInfo?.address ?? "VietNam");
    setWorkLocation(user?.userInfo?.workLocation ?? "VietNam");
    setGender(user?.userInfo?.gender);
    setDateOfBirth(moment(user?.userInfo?.dateOfBirth).format("DD/MM/YYYY"));
  }, [user]);

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
    //console.log(updatedUser);
    dispatch(updateUser(updatedUser));
  };

  const saveWorkLocation = () => {
    const updatedUser = {
      ...user,
      userInfo: { ...user.userInfo, workLocation },
    };
    //console.log(updatedUser);
    dispatch(updateUser(updatedUser));
  };

  const saveGender = () => {
    const updatedUser = {
      ...user,
      userInfo: { ...user.userInfo, gender },
    };
    //console.log(updatedUser);
    dispatch(updateUser(updatedUser));
  };

  const saveBirthday = () => {
    const updatedUser = {
      ...user,
      userInfo: { ...user.userInfo, dateOfBirth },
    };
    //console.log(updatedUser);
    dispatch(updateUser(updatedUser));
  };

  return (
    <div>
      {/* <EditableTimePeriod
        firstIcon={<IoSchoolSharp style={styles.icon} />}
        text="Went to Truong THPT Gia Dinh"
        subText="Attended from 2015 to 2018"
        placeholder="School"
        onSave={saveSchool}
      /> */}
      <EditableText
        firstIcon={<IoHome style={styles.icon} />}
        text={address}
        placeholder="Address"
        onChange={(value) => setAddress(value.target.value)}
        onSave={saveAddress}
        setPreviousState={() => {
          setAddress(user?.userInfo?.address ?? "VietNam");
        }}
      />
      <EditableText
        firstIcon={<MdLocationOn style={styles.icon} />}
        text={workLocation}
        placeholder="Work location"
        onChange={(value) => setWorkLocation(value.target.value)}
        onSave={saveWorkLocation}
        setPreviousState={() => {
          setWorkLocation(user?.userInfo?.workLocation ?? "VietNam");
        }}
      />
      <EditableCombobox
        firstIcon={<FaMale style={styles.icon} />}
        text={gender}
        subText="Gender"
        options={genderOptions}
        onSave={saveGender}
        onChange={(value) => {
          setGender(value[0]);
        }}
        setPreviousState={() => {
          setGender(user?.userInfo?.gender);
        }}
      />
      <EditableTime
        firstIcon={<FaBirthdayCake style={styles.icon} />}
        text={dateOfBirth}
        subText="Birthday"
        onSave={saveBirthday}
        onChange={(date) => {
          setDateOfBirth(moment(date).format());
        }}
        setPreviousState={() => {
          setDateOfBirth(
            moment(user?.userInfo?.dateOfBirth).format("DD/MM/YYYY")
          );
        }}
      />
    </div>
  );
};

export default OverviewPane;
