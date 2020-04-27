export const initialState: any = {
  loading: false,
  response: null,
  error: null,
};

/**
 * @func Reducer getBasicReducer
 * @param state
 * @param action
 */

export default function getBasicReducer(actions:any) {
  const {success, request, failure, clear} = actions;
  console.log('actions,,,', actions);
  return function(state = initialState, action: any) {
    switch (action.type) {
      /* CRUD */
      case request:
        return {
          ...initialState,
          loading: true,
        };

      case success:
        return {
          ...initialState,
          loading: false,
          response: action.payload,
        };

      case failure:
        return {
          ...initialState,
          loading: false,
          error: action.payload,
        };
      case clear:
        console.log('.....CLEAR REDUCER....');
        return {
          ...initialState,
        };
      default:
        return state;
    }
  };
}

export const initialStateBasicSelect: any = {
  loading: false,
  selectedItem: null,
  error: null,
};

export const getBasicSelectReducer = (actions:any) => {
  const {select, clear} = actions;

  return function(state = initialStateBasicSelect, action: any) {
    switch (action.type) {
      /* CRUD */
      case select:
        return {
          ...state,
          selectedItem: {...state.selectedItem, ...action.payload},
        };

      case clear:
        return {
          ...initialStateBasicSelect,
          selectedItem: null,
        };

      default:
        return state;
    }
  };
};
