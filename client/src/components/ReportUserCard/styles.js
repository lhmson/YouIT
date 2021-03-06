import COLOR from "../../constants/colors";

const styles = {
  card: {
    background: "white",
    padding: 20,
    marginBottom: 16,
    flex: 1,
    borderRadius: 30,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    boxShadow: "4px 4px #27AE60",
  },
  tag: {
    color: "#219653",
    fontSize: 12,
    background: "#6FCF97",
    borderColor: "#6FCF97",
    marginRight: 8,
  },
  text: {
    fontweight: 300,
    color: "#27AE60",
  },
  textUser: {
    fontweight: 700,
    fontSize: 20,
  },

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
    overflow: "hidden",
    height: "100vh",
    position: "fixed",
    marginTop: 64,
    left: 0,
  },

  button: {},
};

export default styles;
