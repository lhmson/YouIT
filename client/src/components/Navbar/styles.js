import COLOR from "../../constants/colors";

const styles = {
  logo: {
    float: "left",
    height: 64,
    width: 110,
    display: "flex",
    justifyContent: "center",
    marginRight: 24,
  },
  title: {
    fontSize: "2rem",
    fontWeight: 500,
    color: COLOR.white,
  },
  right: {
    float: "right",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fixedHeader: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
  },
  greenBackground: {
    background: COLOR.green,
  },
};

export default styles;
