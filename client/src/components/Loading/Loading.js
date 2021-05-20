import React from "react";
import { Spin } from "antd";
import COLOR from "../../constants/colors";
import { PlayCircleFilled } from "@ant-design/icons";

function Loading() {
  const icon = <PlayCircleFilled spin style={{ color: COLOR.green }} />;
  return (
    // <Button type="primary" loading style={{ backgroundColor: COLOR.green }}>
    //   Loading
    // </Button>
    <div className="d-flex justify-content-center p-2">
      <Spin size="large" indicator={icon} />
    </div>
  );
}

export default Loading;
