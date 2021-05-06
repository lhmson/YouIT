import COLOR from "../../constants/colors";

const styles = {
  paleBackground: {
    background: COLOR.white,
    paddingTop: 16,
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
    overflow: "hidden",
    height: "100vh",
    position: "fixed",
    marginTop: 64,
    left: 0,
  },
  header: {
    fontSize: 28,
    fontWeight: 700,
    marginLeft: 30,
  },
};

export default styles;
