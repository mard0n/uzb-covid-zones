import * as React from "react";
import { Box, useTheme } from "@material-ui/core";
import { ZoneStatus } from "../../types/zone";
import getZoneStatusColor from "../../utils/getZoneStatusColor";

export interface ZoneStatusPinProps {
  status: ZoneStatus;
}

const ZoneStatusPin: React.SFC<ZoneStatusPinProps> = (props) => {
  const theme = useTheme();
  const { status } = props;

  const statusColor = getZoneStatusColor(status);

  const style = {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: statusColor?.textInWhiteBg,
  };
  return <Box style={style} component="span" />;
};

export default React.memo(ZoneStatusPin, () => true);
