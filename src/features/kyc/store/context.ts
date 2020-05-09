import React from "react";

import profileReducer from "./reducers/profileReducer";
import errorReducer from "./reducers/errorReducer";

import errorState from "./states/errorState";
import profileState from "./states/kycState";
import { useCombineReducers } from "./hooks/useCombineReducers";

export const StateContext = React.createContext<any>(null);
export const DispatchContext = React.createContext((() => {}) as any);

/** EDITABLE CONTENT */

export const [combinedReducers, combinedState] = useCombineReducers({
  profile: [profileReducer, profileState],
  errorState: [errorReducer, errorState],
});

/** EDITABLE CONTENT */
