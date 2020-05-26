import React from "react";
import reducer from "./reducer";
import initialState from "./state";
import { useCombineReducers } from "../../../../../kyc/store/hooks/useCombineReducers";

export const StateContext = React.createContext<any>(null);
export const DispatchContext = React.createContext((() => {}) as any);

/** EDITABLE CONTENT */

export const [combinedReducers, combinedState] = useCombineReducers({
  localAccount: [reducer, initialState]
});

/** EDITABLE CONTENT */
