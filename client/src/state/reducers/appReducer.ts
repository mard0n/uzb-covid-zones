import { State } from "../StateContext";
import { Zone } from "../../types/zone";

export const ADD_ZONES = "ADD_ZONES";
export const ADD_SELECTED_ZONE_ID = "ADD_SELECTED_ZONE_ID";

export type Action =
  | { type: "ADD_ZONES"; payload: Zone[] }
  | { type: "ADD_SELECTED_ZONE_ID"; payload: string };

export const appReducer = (state: State, action: Action): State => {
  console.log("action", action);
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
    default:
      return state;
  }
};
