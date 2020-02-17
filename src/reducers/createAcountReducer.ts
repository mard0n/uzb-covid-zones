import { Action } from 'redux';
import { CreateAccountActions } from '../actions/createAccountActions';

export interface ReduxAction extends Action {
    payload: any;
}

export const stepsID = [
    "prelogin",
    "personalinfo",
    "authentication",
    "terms",
    "locked",
    "success"
];

const stepsTitles = [
    "Step 1. Pre Login ",
    "Step 2. Personal Information",
    "Step 3. Authentication",
    "Step 4. Terms and Condition",
    "Step 5. Locked",
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