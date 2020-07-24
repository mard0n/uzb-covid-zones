import * as React from "react";
import { Box, useTheme } from "@material-ui/core";
import { ZoneStatus } from "../../types/zone";
import getZoneStatusProps from "../../utils/getZoneStatusProps";

export interface ZoneStatusPinProps {
  status: ZoneStatus;
  style?: any
}

const ZoneStatusPin: React.SFC<ZoneStatusPinProps> = (props) => {
  const { status, style = {} } = props;

  const statusColor = getZoneStatusProps(status);

  const boxStyle = {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: statusColor?.textInWhiteBg,
  };
  return <Box style={{...boxStyle, ...style}} component="span" />;
};

export default React.memo(ZoneStatusPin, () => true);
