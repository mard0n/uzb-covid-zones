import { Action } from 'redux';

export interface ReduxAction extends Action {
    payload: any;
}

const initialState = {
    direction: "ltr",
};

export const globalSetupReducer = (state = initialState, action: ReduxAction) => {

    switch (action.type) {
        case "UPDATE_RTL":
            return {
                ...state,
                direction: action.payload
            }
            
        default: return state;
    }
}