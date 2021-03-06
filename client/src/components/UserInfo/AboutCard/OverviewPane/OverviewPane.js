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
import { message } from "antd";

const OverviewPane = () => {
  const user = useSelector((state) => state.user);
  // console.log("user", user);
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

  const genderOptions = ["Male", "Female", "Others"];

  //const saveSchool = () => {};

  const saveUserInfo = (updatedFields) => () => {
    const key = "updateUserInfo"
    message.loading({ content: "Saving your information...", key })

    const callback = () => {
      message.success({ content: "Your information has been updated!", key });
    }
    dispatch(updateUser(updatedFields, callback));
  }

  const saveAddress = saveUserInfo({ userInfo: { address } });
  const saveWorkLocation = saveUserInfo({ userInfo: { workLocation } });
  const saveGender = saveUserInfo({ userInfo: { gender } });
  const saveBirthday = saveUserInfo({ userInfo: { dateOfBirth } });

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
        onChange={(value) => {
          setWorkLocation(value.target.value);
        }}
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
        placeholder="Gender"
        options={genderOptions}
        onSave={saveGender}
        onChange={(value) => {
          setGender(value);
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
