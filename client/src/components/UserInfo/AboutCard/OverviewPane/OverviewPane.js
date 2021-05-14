import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoHome, MdLocationOn, FaMale, FaBirthdayCake } from "react-icons/all";
import moment from "moment";

import styles from "./styles.js";
import EditableText from "./EditableText/EditableText.js";
import EditableCombobox from "./EditableCombobox/EditableCombobox.js";
import EditableTime from "./EditableTime/EditableTime.js";

import { updateUser } from "../../../../redux/actions/user";
import { isLoginUser } from "../../../../utils/user.js";

const OverviewPane = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isMyProfile = isLoginUser(user);

  const [dateOfBirth, setDateOfBirth] = useState(
    moment(user?.userInfo?.dateOfBirth).format("DD/MM/YYYY")
  );

  const [address, setAddress] = useState(user?.userInfo?.address ?? "VietNam");

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

  //const saveSchool = () => {};

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
        editable={isMyProfile}
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
        editable={isMyProfile}
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
        editable={isMyProfile}
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
        editable={isMyProfile}
      />
    </div>
  );
};

export default OverviewPane;
