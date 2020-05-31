import React from "react";
import { useCombineReducers } from "../../kyc/store/hooks/useCombineReducers";

import pinResetReducer from "./reducers/pinResetReducer";

import pinResetState from "./states/pinResetState";

export const StateContext = React.createContext<any>(null);
export const DispatchContext = React.createContext((() => {}) as any);

/** EDITABLE CONTENT */

export const [combinedReducers, combinedState] = useCombineReducers({
  pinReset: [pinResetReducer, pinResetState],
});

/** EDITABLE CONTENT */
