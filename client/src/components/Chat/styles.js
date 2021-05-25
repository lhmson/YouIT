import COLOR from "../../constants/colors";

const styles = {
  paleBackground: {
    background: COLOR.white,
  },
  item: {
    display: "flex",
    alignItems: "center",
    minHeight: 50,
    // backgroundColor: "red",
  },
  transparent: {
    backgroundColor: "transparent",
  },
  fixedSider: {
    // overflow: "hidden",
    // height: "100vh",
    // position: "fixed",
    // marginTop: 64,
    // zIndex: 10,
    // left: 0,
  },

  input: {
    flex: "1 0 0",
    color: COLOR.white,
    outline: "none",
    // fontWeight: "bold",
    width: "100%",
    height: 30,
    border: 0,
    fontSize: "1.2rem",
    background: `no-repeat ${COLOR.greenSmoke}`,
    // backgroundSize: "20px 20px",
    // backgroundPosition: "15px center",
  },
};

export default styles;
