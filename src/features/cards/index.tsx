import React, { useReducer } from "react";
import { Box } from "@mashreq-digital/ui";
import {
  DispatchContext,
  StateContext,
  combinedReducers,
  combinedState,
} from "./store/context";
import { Route } from "react-router-dom";
import * as RoutePath from "./routes/config";
import PinReset from "./pinReset";
import CardActivation from "./cardActivation";

export interface CardsProps {}

const Cards: React.SFC<CardsProps> = () => {
  const [state, dispatch] = useReducer(combinedReducers, combinedState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Route path={RoutePath.PIN_RESET}>
          <PinReset />
        </Route>
        <Route path={RoutePath.CARD_ACTIVATION}>
          <CardActivation />
        </Route>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default Cards;
