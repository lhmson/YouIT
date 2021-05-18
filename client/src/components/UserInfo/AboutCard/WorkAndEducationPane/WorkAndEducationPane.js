import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";

import styles from "./styles.js";
import { WorkEduRow } from "../index.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoginUser } from "../../../../utils/user.js";

const WorkAndEducationPane = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isMyProfile = isLoginUser(user);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   switch (heading) {
  //     case "Work":
  //       setData(user?.userInfo?.works);
  //       console.log(data);
  //       break;
  //     case "College":
  //       setData(user?.userInfo?.educations);
  //       console.log(data);
  //       break;
  //     default:
  //       break;
  //   }
  //   return () => {};
  // }, [user]);

  return (
    <div className="container">
      <Col>
        <Row style={styles.headingView}>
          <WorkEduRow
            heading="Work"
            addingText="Add a workplace"
            editable={isMyProfile}
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
