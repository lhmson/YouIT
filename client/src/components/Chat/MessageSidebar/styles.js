import COLOR from "../../../constants/colors";

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
    overflow: "hidden",
    height: "100vh",
    position: "fixed",
    marginTop: 64,
    left: 0,
  },
  searchContainer: {
    background: COLOR.green,
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    zIndex: 0,
  },
  input: {
    flex: "1 0 0",
    color: "#eee",
    outline: "none",
    fontWeight: "bold",
    width: "100%",
    borderRadius: "2px",
    height: "30px",
    border: 0,
    paddingLeft: "30%",
    fontSize: "1.4rem",
    background:
      "url('https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png') no-repeat rgba(255, 255, 255, 0.3)",
    backgroundSize: "20px 20px",
    backgroundPosition: "15px center",
  },
};

export default styles;
