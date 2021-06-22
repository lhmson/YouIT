import COLOR from "../../constants/colors";

const styles = {
  card: {
    background: "white",
    padding: 16,
    flex: 1,
    marginBottom: 16,
  },
  tag: {
    color: "#219653",
    fontSize: 12,
    background: "#6FCF97",
    borderColor: "#6FCF97",
    marginRight: 8,
  },
  text: {
    fontWeight: 300,
    color: "#27AE60",
  },
  textUser: {
    fontWeight: 700,
    fontSize: 18,
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
