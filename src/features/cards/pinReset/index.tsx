import React, { useState } from "react";
import JourneySidebar from "../../../components/JourneySidebar";
import { MONEY_TRANSFER_LOCAL_STEPS } from "../../../util/constants";
import { Box } from "@mashreq-digital/ui";
import { Route, Redirect } from "react-router-dom";
import * as RoutePath from "../routes/config";
import PinResetInit from "./screens/PinResetInit";

export interface PinResetProps {}

const PinReset: React.SFC<PinResetProps> = () => {
  const [step, setStep] = useState(0);

  return (
    <Box display="flex" width={"100%"}>
      <JourneySidebar steps={MONEY_TRANSFER_LOCAL_STEPS} currentStep={step} />
      <Route path={RoutePath.PIN_RESET_INIT}>
        <PinResetInit />
      </Route>
    </Box>
  );
};

export default PinReset;
