import React, { createContext, useReducer, useEffect } from "react";
import stateReducer from "./stateReducer";
import { Action } from "./reducers/appReducer";
import { Zone } from "../types/zone";

export type State = {
  zones: Zone[];
  selectedZoneId: string;
  navigateTo: Function;
  closeBottomSheet: Function;
  dispatch: React.Dispatch<Action>;
};

export const initialState = {
  zones: [],
  selectedZoneId: "",
  navigateTo: () => null,
  closeBottomSheet: () => null,
  dispatch: () => null,
};

export const StateContext = createContext<State>(initialState);

export interface StateContextProviderProps {
  initialState: State;
}

const StateContextProvider: React.SFC<StateContextProviderProps> = (props) => {
  const [state, dispatch] = useReducer(stateReducer, props.initialState);
  return (
    <StateContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
