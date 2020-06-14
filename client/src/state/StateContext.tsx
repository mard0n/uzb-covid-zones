import React, { createContext, useReducer } from "react";
import stateReducer from "./stateReducer";

export const StateContext = createContext<any>({});

export const initialState = {};

const StateContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(stateReducer, props.initialState);
  console.log('state', state);
  return (
    <StateContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
