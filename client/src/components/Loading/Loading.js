import React from "react";
import { Button } from "antd";
import COLOR from "../../constants/colors";

function Loading() {
  return (
    <Button type="primary" loading style={{ backgroundColor: COLOR.green }}>
      Loading
    </Button>
  );
}

export default Loading;
