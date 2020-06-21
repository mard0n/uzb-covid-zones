import React from "react";
import { Box } from "@mashreq-digital/ui";
import { Route } from "react-router-dom";
import * as RoutePath from "../routes/config";
import PinSet from "../shared/screens/PinSet";
import Auth from "../shared/screens/Auth";
import PinResetSuccess from "./screens/PinResetSuccess";
import PinResetFail from "./screens/PinResetFail";
import * as Endpoint from "../../../network/Endpoints";

export interface PinResetProps {}

const PinReset: React.SFC<PinResetProps> = () => {
  return (
    <Box>
      <Route path={RoutePath.PIN_RESET} exact>
        <PinSet
          nextPage={RoutePath.PIN_RESET_AUTH}
          steps={"cards.pinReset.steps"}
          currentStep={0}
        />
      </Route>
      <Route path={RoutePath.PIN_RESET_AUTH}>
        <Auth
          immediateApiCall={{
            endpoint: Endpoint.CARDS_PIN_RESET_AUTH_VALIDATE,
            data: {
              cardNumber:
                "0E3F9DC4A67AFB8F36CD17B18C039C42A76DEE63C9CEBAFBFAB3D23B02ED17B9",
              encryptedPinNo: "334343432244",
            },
            routeOnSuccess: RoutePath.PIN_RESET_SUCCESS,
            routeOnFail: RoutePath.PIN_RESET_FAIL,
          }}
          steps={"cards.pinReset.steps"}
          currentStep={1}
        />
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
