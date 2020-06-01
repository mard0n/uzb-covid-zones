import React from "react";
import { Box } from "@mashreq-digital/ui";
import { Route } from "react-router-dom";
import * as RoutePath from "../routes/config";
import PinResetInit from "./screens/PinResetInit";
import PinResetAuth from "./screens/PinResetAuth";
import PinResetSuccess from "./screens/PinResetSuccess";
import PinResetFail from "./screens/PinResetFail";

export interface PinResetProps {}

const PinReset: React.SFC<PinResetProps> = () => {
  return (
    <Box>
      <Route path={RoutePath.PIN_RESET_INIT}>
        <PinResetInit />
      </Route>
      <Route path={RoutePath.PIN_RESET_AUTH}>
        <PinResetAuth />
      </Route>
      <Route path={RoutePath.PIN_RESET_SUCCESS}>
        <PinResetSuccess />
      </Route>
      <Route path={RoutePath.PIN_RESET_FAIL}>
        <PinResetFail />
      </Route>
    </Box>
  );
};

export default PinReset;
