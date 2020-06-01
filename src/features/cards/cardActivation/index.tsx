import React from "react";
import { Box } from "@mashreq-digital/ui";
import { Route } from "react-router-dom";
import * as RoutePath from "../routes/config";
import CardActivationInit from "./screens/CardActivationInit";
import PinSetInit from "./screens/PinSetInit";
import PinSetAuth from "./screens/PinSetAuth";
import CardActivationSuccess from "./screens/CardActivationSuccess";
import CardActivationFail from "./screens/CardActivationFail";

export interface CardActivationProps {}

const CardActivation: React.SFC<CardActivationProps> = () => {
  return (
    <Box>
      <Route path={RoutePath.CARD_ACTIVATION_INIT}>
        <CardActivationInit />
      </Route>
      <Route path={RoutePath.PIN_SET_INIT}>
        <PinSetInit />
      </Route>
      <Route path={RoutePath.PIN_SET_AUTH}>
        <PinSetAuth />
      </Route>
      <Route path={RoutePath.CARD_ACTIVATION_SUCCESS}>
        <CardActivationSuccess />
      </Route>
      <Route path={RoutePath.CARD_ACTIVATION_FAIL}>
        <CardActivationFail />
      </Route>
    </Box>
  );
};

export default CardActivation;
