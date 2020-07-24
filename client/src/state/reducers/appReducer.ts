import { State } from "../StateContext";
import { Zone } from "../../types/zone";

export const ADD_ZONES = "ADD_ZONES";
export const ADD_SELECTED_ZONE_ID = "ADD_SELECTED_ZONE_ID";
export const ADD_NAVIGATE_TO_FN = "ADD_NAVIGATE_TO_FN";

export type Action =
  | { type: "ADD_ZONES"; payload: Zone[] }
  | { type: "ADD_SELECTED_ZONE_ID"; payload: string }
  | { type: "ADD_NAVIGATE_TO_FN"; payload: Function };

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ADD_ZONES:
      return {
        ...state,
        zones: action.payload,
      };
    case ADD_SELECTED_ZONE_ID:
      return {
        ...state,
        selectedZoneId: action.payload,
      };
    case ADD_NAVIGATE_TO_FN:
      return {
        ...state,
        navigateTo: action.payload,
      };
    default:
      return state;
  }
};
