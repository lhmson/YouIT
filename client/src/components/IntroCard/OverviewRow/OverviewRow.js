import React from "react";
import { Typography } from "antd";

import styles from "./styles.js";

const { Text } = Typography;

const OverviewRow = (props) => {
  return (
    <>
      <div className="container" style={styles.whiteBackground}>
        <div className="row" style={{ marginLeft: 0 }}>
          <div className="mr-2 mb-2">{props.firstIcon}</div>
          <div> {props.text}</div>
        </div>

        {/* <div className="row" style={{ alignItems: "center" }}>
          <div className="col-8">
            <div
              className="col"
              style={{ display: "flex", alignItems: "left" }}
            >
              {props.firstIcon}
              <div>
                <Text style={{ fontSize: 16, fontWeight: 400 }}>
                  {props.text}
                </Text>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default OverviewRow;
