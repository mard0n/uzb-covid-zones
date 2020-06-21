import React from "react";
import { Box } from "@mashreq-digital/ui";
import { Route } from "react-router-dom";
import * as RoutePath from "../routes/config";
import CardActivationInit from "./screens/CardActivation";
import PinSet from "../shared/screens/PinSet";
import Auth from "../shared/screens/Auth";
import CardActivationSuccess from "./screens/CardActivationSuccess";
import CardActivationFail from "./screens/CardActivationFail";
import * as Endpoint from "../../../network/Endpoints";

export interface CardActivationProps {}

const CardActivation: React.SFC<CardActivationProps> = () => {
  return (
    <Box>
      <Route path={RoutePath.CARD_ACTIVATION} exact>
        <CardActivationInit />
      </Route>
      <Route path={RoutePath.PIN_SET}>
        <PinSet
          nextPage={RoutePath.PIN_SET_AUTH}
          steps={"cards.cardActivation.steps"}
          currentStep={1}
        />
      </Route>
      <Route path={RoutePath.PIN_SET_AUTH}>
        <Auth
          immediateApiCall={{
            endpoint: Endpoint.CARDS_PIN_RESET_AUTH_VALIDATE,
            data: {
              cardNumber:
                "0E3F9DC4A67AFB8F36CD17B18C039C42A76DEE63C9CEBAFBFAB3D23B02ED17B9",
              encryptedPinNo: "334343432244",
            },
            routeOnSuccess: RoutePath.CARD_ACTIVATION_SUCCESS,
            routeOnFail: RoutePath.CARD_ACTIVATION_FAIL,
          }}
          steps={"cards.cardActivation.steps"}
          currentStep={2}
        />
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
