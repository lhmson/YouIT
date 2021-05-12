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
  headerPreview: {
    fontSize: 24,
    fontWeight: 650,
    marginLeft: 20,
  },
  Background: {
    background: COLOR.red,
    paddingTop: 16,
    margin: 50,
    marginLeft: 450,
  },
  Preview: {
    paddingTop: 16,
    margin: 50,
    marginLeft: 450,
  },
  fixedLayout: {
    overflow: "hidden",
    height: "100vh",
    position: "fixed",
    marginTop: 64,
    left: 0,
    // width: "100%",
  },
  button: {
    marginRight: 16,
    borderRadius: 4,
    width: "80%",
  },
};

export default styles;
