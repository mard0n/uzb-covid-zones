import { Action } from 'redux';
import { CreateAccountActions } from '../actions/createAccountActions';

export interface ReduxAction extends Action {
    payload: any;
}

export const stepsID = [
    "personalinfo",
    "prelogin",
    "authentication",
    "terms",
    "success"
];

const stepsTitles = [
    "Step 1. Personal Information",
    "Step 2. Pre Login ",
    "Step 3. Authentication",
    "Step 4. Terms and Condition",
    "Success",
];

const initialState = {
    activeStep: 0,
    activeStepTitle: stepsTitles[0],
    isFirstStep: true,
    isLastStep: false
};

export const CreateAccountReducer = (state = initialState, action: ReduxAction) => {

    switch (action.type) {
        case CreateAccountActions.setActiveStep:
            return {
                ...state,
                activeStep: action.payload,
                activeStepTitle: stepsTitles[action.payload],
                isFirstStep: action.payload === 0,
                isLastStep: action.payload === stepsID.length - 1
            }
            
        default: return state;
    }
}