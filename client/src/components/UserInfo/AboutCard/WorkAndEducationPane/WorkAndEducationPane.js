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

  const saveWorks = () => {
    const updatedFields = { userInfo: { works } };
    dispatch(updateUser(updatedFields));
  };

  // add new work
  const addWorkLocation = (value) => {
    const newLocation = value.target.value;
    let updatedWork = { ...newWork, location: newLocation };
    setNewWork(updatedWork);
  };

  const addWorkPosition = (value) => {
    const newPosition = value.target.value;
    let updatedWork = { ...newWork, position: newPosition };
    setNewWork(updatedWork);
  };

  const addWork = () => {
    works.push(newWork);
    saveWorks();
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

  // delete a work
  const deleteWork = (index) => {
    works.splice(index, 1);
    saveWorks();
  };

  const saveEducations = () => {
    const updatedFields = { userInfo: { educations } };
    dispatch(updateUser(updatedFields));
  };

  // add new education
  const addSchoolName = (value) => {
    const newSchoolName = value.target.value;
    let updatedEducation = { ...newEducation, schoolName: newSchoolName };
    setNewEducation(updatedEducation);
  };

  const addMoreInfo = (value) => {
    const newInfo = value.target.value;
    let updatedEducation = { ...newEducation, moreInfo: newInfo };
    setNewEducation(updatedEducation);
  };

  const addEducation = () => {
    educations.push(newEducation);
    saveEducations();
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

  // delete education
  const deleteEducation = (index) => {
    educations.splice(index, 1);
    saveEducations();
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
            onSave={saveWorks}
            onNewTextChange={(value) => {
              addWorkLocation(value);
            }}
            onNewSubTextChange={(value) => addWorkPosition(value)}
            onAdd={addWork}
            onDelete={(index) => deleteWork(index)}
            newPlaceholder="Work location"
            newSubPlaceholder="Work position"
          />
        </Row>
        <Row style={styles.headingView}>
          <WorkEduRow
            heading="Education"
            addingText="Add an education"
            editable={isMyProfile}
            onTextChange={(index, value) => changeSchoolName(index, value)}
            onSubTextChange={(index, value) => changeMoreInfo(index, value)}
            onSave={saveEducations}
            onNewTextChange={(value) => addSchoolName(value)}
            onNewSubTextChange={(value) => addMoreInfo(value)}
            onAdd={addEducation}
            onDelete={(index) => deleteEducation(index)}
            newPlaceholder="School name"
            newSubPlaceholder="More info (major, time,...)"
          />
        </Row>
      </Col>
    </div>
  );
};

export default WorkAndEducationPane;
