import { Theme, ColorFormat } from "@material-ui/core";
import { ZoneStatus } from "../types/zone";
import { Color } from "@material-ui/lab";

const getZoneStatusColor = (status: ZoneStatus) => {
  let whiteBgText: string = "",
    blueishBgText: string = "";
  switch (status) {
    case ZoneStatus.RED:
      whiteBgText = "#EA5C73";
      blueishBgText = "#FF4967";
      break;
    case ZoneStatus.YELLOW:
      whiteBgText = "#EF7C38";
      blueishBgText = "#FF9635";
      break;
    case ZoneStatus.GREEN:
      whiteBgText = "#87D03F";
      blueishBgText = "#87D03F";
      break;
    default:
      whiteBgText = "#ccc";
      break;
  }
  return { textInWhiteBg: whiteBgText, textInBlueishBg: blueishBgText };
};

export default getZoneStatusColor;
