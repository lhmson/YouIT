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

  const [works, setWorks] = useState(user?.userInfo?.works);
  const [educations, setEducations] = useState(user?.userInfo?.educations);

  useEffect(() => {
    setWorks(user?.userInfo?.works);
    setEducations(user?.userInfo?.educations);
  }, [user]);

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
    updatedWorks[index] = { ...updatedWorks[index], position: newPosition };
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
          />
        </Row>
        <Row style={styles.headingView}>
          <WorkEduRow
            heading="College"
            addingText="Add a college"
            editable={isMyProfile}
          />
        </Row>
      </Col>
    </div>
  );
};

export default WorkAndEducationPane;
