import React from "react";
import { Typography } from "antd";

import styles from "./styles.js";

const { Text } = Typography;

const OverviewRow = (props) => {
  return (
    <>
      <div className="container" style={{ marginBottom: 32 }}>
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-8">
            <div
              className="row"
              style={{ display: "flex", alignItems: "center" }}
            >
              {props.firstIcon}
              <div>
                <Text style={{ fontSize: 16, fontWeight: 400 }}>
                  {props.text}
                </Text>
                <br />
                <Text style={{ fontSize: 14 }}>{props.subText}</Text>
              </div>
            </div>
          </div>
          <div
            className="col-2 offset-1"
            style={{
              background: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {props.lastIcon}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewRow;
