import React, { useState, useEffect } from "react";
import styles from "./styles.js";
import { Layout } from "antd";

import RelatedCard from "../../components/RelatedCard/RelatedCard.js";

const { Sider } = Layout;

function FixedRightPanel(props) {
  const { children } = props;
  return (
    <>
      {/* <Sider
        className="col-{breakpoint}-auto"
        width={350}
        style={{
          backgroundColor: "transparent",
        }}
      > */}
      <div className=" mb-4">
        <div>{children}</div>
      </div>
      {/* </Sider> */}
    </>
  );
}

export default FixedRightPanel;
