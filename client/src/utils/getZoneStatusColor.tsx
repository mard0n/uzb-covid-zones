import { ZoneStatus } from "../types/zone";

const getZoneStatusColor = (status: ZoneStatus) => {
  let textColorInWhite: string = "",
    textColorInBlue: string = "",
    text: string = "",
    bgColor: string = "";
  switch (status) {
    case ZoneStatus.RED:
      textColorInWhite = "#EA5C73";
      textColorInBlue = "#FF4967";
      text = "Dangerous";
      bgColor = "#ff0c0c26";
      break;
    case ZoneStatus.YELLOW:
      textColorInWhite = "#EF7C38";
      textColorInBlue = "#FF9635";
      text = "Warning";
      bgColor = "#ffeb0159";
      break;
    case ZoneStatus.GREEN:
      textColorInWhite = "#87D03F";
      textColorInBlue = "#87D03F";
      text = "Safe to Visit";
      bgColor = "#8ff8293d";
      break;
    default:
      break;
  }
  return {
    textInWhiteBg: textColorInWhite,
    textInBlueishBg: textColorInBlue,
    text: text,
    bgColor: bgColor
  };
};

export default getZoneStatusColor;
