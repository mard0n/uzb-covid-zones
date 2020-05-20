import React from "react";

import profilesReducer from "./reducers/profilesReducer";
import errorReducer from "./reducers/errorReducer";
import activeProfileReducer from './reducers/activeProfileReducer';

import errorState from "./states/errorState";
import profilesState from "./states/profilesState";
import activeProfileState from "./states/activeProfileState";

import { useCombineReducers } from "./hooks/useCombineReducers";

export const StateContext = React.createContext<any>(null);
export const DispatchContext = React.createContext((() => {}) as any);

/** EDITABLE CONTENT */

export const [combinedReducers, combinedState] = useCombineReducers({
  profiles: [profilesReducer, profilesState],
  active: [activeProfileReducer,activeProfileState],
  errorState: [errorReducer, errorState],
});

/** EDITABLE CONTENT */
