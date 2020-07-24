import { ZoneStatus } from "../types/zone";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

const getZoneStatusProps = (status: ZoneStatus, t?: TFunction) => {
  let textColorInWhite: string = "",
    textColorInBlue: string = "",
    text: string | undefined = "",
    bgColor: string = "";
  switch (status) {
    case ZoneStatus.RED:
      textColorInWhite = "#EA5C73";
      textColorInBlue = "#FF4967";
      text = t && t("selectedZoneName.statusBadge.dangerous");
      bgColor = "#ff0c0c26";
      break;
    case ZoneStatus.YELLOW:
      textColorInWhite = "#EF7C38";
      textColorInBlue = "#FF9635";
      text = t && t("selectedZoneName.statusBadge.warning");
      bgColor = "#ffeb0159";
      break;
    case ZoneStatus.GREEN:
      textColorInWhite = "#87D03F";
      textColorInBlue = "#87D03F";
      text = t && t("selectedZoneName.statusBadge.safe");
      bgColor = "#8ff8293d";
      break;
    default:
      break;
  }
  return {
    textInWhiteBg: textColorInWhite,
    textInBlueishBg: textColorInBlue,
    text: text,
    bgColor: bgColor,
  };
};

export default getZoneStatusProps;
