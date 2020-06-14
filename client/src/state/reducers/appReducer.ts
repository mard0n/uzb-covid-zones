export const ADD_ZONES = "ADD_ZONES";
export const ADD_SELECTED_ZONE_ID = "ADD_SELECTED_ZONE_ID";
export const ADD_STATUS_DESCRIPTION = "ADD_STATUS_DESCRIPTION";
export const ADD_CASE_TO_HISTORY = "ADD_CASE_TO_HISTORY";
export const DELETE_CASE_FROM_HISTORY = "DELETE_CASE_FROM_HISTORY";

export const appReducer = (state: any, action: any) => {
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
    case ADD_STATUS_DESCRIPTION:
      return {
        ...state,
        zonesStatusDesc: action.payload,
      };
    default:
      return state;
  }
};
