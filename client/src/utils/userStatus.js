import COLOR from "../constants/colors";

export const statusList = [
  { status: "online", color: COLOR.green },
  { status: "busy", color: COLOR.red },
  { status: "offline", color: COLOR.gray },
  // { status: "unknown", color: COLOR.white },
];

export const renderStatus = (status) => {
  switch (status) {
    case "online":
      return COLOR.green;
    case "busy":
      return COLOR.red;
    case "offline":
      return COLOR.gray;
    default:
      return COLOR.white;
  }
};
