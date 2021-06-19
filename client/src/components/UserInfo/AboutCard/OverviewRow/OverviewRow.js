import React from "react";
import { Row, Typography } from "antd";

import styles from "./styles.js";

const { Text } = Typography;

const OverviewRow = (props) => {
  return (
    <>
      <div className="container" style={{ marginBottom: 32 }}>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Row
            style={{
              // display: "flex",
              alignItems: "center",
              // width: "90%",
            }}
          >
            {props.firstIcon}
            <div>
              <Text style={{ fontSize: 16, fontWeight: 400 }}>
                {props.text}
              </Text>
              <br />
              <Text style={{ fontSize: 14 }}>{props.subText}</Text>
            </div>
          </Row>
          {props.lastIcon}
        </Row>
      </div>
    </>
  );
};

export default OverviewRow;
