import COLOR from "../../constants/colors";

const styles = {
  item: {
    background: COLOR.white,
    padding: 24,
    marginBottom: 24,
    fontSize: "1rem",
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
  icon: {
    marginLeft: 16,
    fontSize: 24,
  },
};

export default styles;
