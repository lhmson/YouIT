import React from "react";

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
