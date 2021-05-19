import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";

import styles from "./styles.js";
import { WorkEduRow } from "../index.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoginUser } from "../../../../utils/user.js";
import { updateUser } from "../../../../redux/actions/user.js";

const WorkAndEducationPane = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isMyProfile = isLoginUser(user);

  // for editing
  const [works, setWorks] = useState(user?.userInfo?.works);
  const [educations, setEducations] = useState(user?.userInfo?.educations);

  // for adding new work/education
  const [newWork, setNewWork] = useState({ location: null, position: null });
  const [newEducation, setNewEducation] = useState("");

  useEffect(() => {
    setWorks(user?.userInfo?.works);
    setEducations(user?.userInfo?.educations);
  }, [user]);

  const addWorkLocation = (value) => {
    const newLocation = value.target.value;
    console.log(newLocation);
    let updatedWork = { ...newWork, location: newLocation };
    //setNewWork(updatedWork);
    //console.log(newWork);
  };

  // edit works
  const changeWorkLocation = (index, value) => {
    const newLocation = value.target.value;
    let updatedWorks = [...works];
    updatedWorks[index] = { ...updatedWorks[index], location: newLocation };
    setWorks(updatedWorks);
    //console.log(works);
  };

  const changeWorkPosition = (index, value) => {
    const newPosition = value.target.value;
    let updatedWorks = [...works];
    if (index > -1) {
      updatedWorks[index] = { ...updatedWorks[index], position: newPosition };
    }
    setWorks(updatedWorks);
    //console.log(works);
  };

  const saveWorks = () => {
    const updatedUser = {
      ...user,
      userInfo: { ...user.userInfo, works: works },
    };
    console.log(updatedUser);
    dispatch(updateUser(updatedUser));
  };

  // edit educations
  const changeSchoolName = (index, value) => {
    const newSchoolName = value.target.value;
    let updatedEducations = [...educations];
    if (index > -1) {
      updatedEducations[index] = {
        ...updatedEducations[index],
        schoolName: newSchoolName,
      };
    }
    setEducations(updatedEducations);
    //console.log(works);
  };

  const changeMoreInfo = (index, value) => {
    const newInfo = value.target.value;
    let updatedEducations = [...educations];
    if (index > -1) {
      updatedEducations[index] = {
        ...updatedEducations[index],
        moreInfo: newInfo,
      };
    }
    setEducations(updatedEducations);
    //console.log(works);
  };

  const saveEducations = () => {
    const updatedUser = {
      ...user,
      userInfo: { ...user.userInfo, educations: educations },
    };
    console.log(updatedUser);
    dispatch(updateUser(updatedUser));
  };

  return (
    <div className="container">
      <Col>
        <Row style={styles.headingView}>
          <WorkEduRow
            heading="Work"
            addingText="Add a workplace"
            editable={isMyProfile}
            onTextChange={(index, value) => changeWorkLocation(index, value)}
            onSubTextChange={(index, value) => changeWorkPosition(index, value)}
            onNewTextChange={(value) => {
              addWorkLocation(value);
            }}
            onNewSubTextChange={(value) => {}}
            onSave={saveWorks}
          />
        </Row>
        <Row style={styles.headingView}>
          <WorkEduRow
            heading="College"
            addingText="Add a college"
            editable={isMyProfile}
            onTextChange={(index, value) => changeSchoolName(index, value)}
            onSubTextChange={(index, value) => changeMoreInfo(index, value)}
            onSave={saveEducations}
          />
        </Row>
      </Col>
    </div>
  );
};

export default WorkAndEducationPane;
