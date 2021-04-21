import React from "react";
import { Button } from "antd";

import styles from "./styles.js";
import { WorkEduRow } from "../index.js";

const WorkAndEducationPane = () => {
  return (
    <div className="container">
      <div
        className="col"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="row" style={styles.headingView}>
          <WorkEduRow heading="Work" addingText="Add a workplace" />
        </div>
        <div className="row" style={styles.headingView}>
          <WorkEduRow heading="College" addingText="Add a college" />
        </div>
      </div>
    </div>
  );
};

export default WorkAndEducationPane;
