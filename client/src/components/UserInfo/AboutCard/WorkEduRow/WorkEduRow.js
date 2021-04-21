import React from "react";
import { Typography, Button } from "antd";
import { GrAddCircle } from "react-icons/all";

import styles from "./styles.js";

const { Text, Title } = Typography;

const ListItems = () => {
  //data here
  return <></>;
};

function WorkEduRow(props) {
  return (
    <div className="row" style={{ display: "flex", flexDirection: "column" }}>
      <Title level={3}>{props.heading}</Title>
      <ListItems />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button type="link" size="large">
          <GrAddCircle style={styles.icon} color="blue" />
          {props.addingText}
        </Button>
      </div>
    </div>
  );
}

export default WorkEduRow;
