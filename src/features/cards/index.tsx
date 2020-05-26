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

export interface CardsProps {}

const Cards: React.SFC<CardsProps> = () => {
  const [state, dispatch] = useReducer(combinedReducers, combinedState);
  
  return (
    <Box display="flex">
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <Route path={RoutePath.PIN_RESET}>
            <PinReset />
          </Route>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </Box>
  );
};

export default Cards;
