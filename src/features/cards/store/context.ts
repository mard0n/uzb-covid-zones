import React from "react";
import { useCombineReducers } from "../../kyc/store/hooks/useCombineReducers";

import profilesReducer from "./reducers/profilesReducer";

import profilesState from "./states/profilesState";

export const StateContext = React.createContext<any>(null);
export const DispatchContext = React.createContext((() => {}) as any);

/** EDITABLE CONTENT */

export const [combinedReducers, combinedState] = useCombineReducers({
  profiles: [profilesReducer, profilesState],
});

/** EDITABLE CONTENT */
