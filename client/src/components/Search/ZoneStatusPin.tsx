import * as React from "react";
import { Box, useTheme } from "@material-ui/core";

export interface ZoneStatusPinProps {
  status: any;
}

const ZoneStatusPin: React.SFC<ZoneStatusPinProps> = (props: any) => {
  const theme = useTheme();
  const { status } = props;

  let statusColor: any;
  switch (status) {
    case "RED":
      statusColor = theme.zoneStatusColor.danger.main;
      break;
    case "YELLOW":
      statusColor = theme.zoneStatusColor.mild.main;
      break;
    case "GREEN":
      statusColor = theme.zoneStatusColor.safe.main;
      break;
    default:
      statusColor = "#ccc";
      break;
  }

  const style = {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: statusColor,
    marginRight: 16,
  };
  return <Box style={style} component="span" />;
};

export default React.memo(ZoneStatusPin, () => true);
