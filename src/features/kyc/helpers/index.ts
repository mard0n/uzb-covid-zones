import {parseISO, differenceInDays} from 'date-fns'
import { LOGIN_USER_TYPE, IProfileResponse, IKycState, RISK_LEVEL, CUSTOMER_IDENTIFIER_MAPPING, SEGMENT, EMPLOYMENT_STATUS } from "../types";


const transformInitialState = (initialState: IProfileResponse) => {

    let defaultRiskLevel: number = RISK_LEVEL.L3;
    if(initialState.riskLevel) {
        const match =  initialState.riskLevel.match(/(\d+)/)
        defaultRiskLevel = match ? parseInt(match[0]) : defaultRiskLevel;
    }

    const riskLevelForCustomerIdentifier: CUSTOMER_IDENTIFIER_MAPPING = parseInt((<any>CUSTOMER_IDENTIFIER_MAPPING)[initialState.customerIdentifier])
    let customerSegment = SEGMENT.RETAIL;
    if(initialState.customerSegment === "CUSTGOLD" 
        || initialState.customerSegment === "CUSTPVT" ) {
            customerSegment = SEGMENT.WEALTH;
    }


    const targetState: IKycState = {
            ...initialState,
            defaultRiskLevel,
            newRiskLevel: Math.max(defaultRiskLevel, riskLevelForCustomerIdentifier),
            nationalIdExpiryDays: differenceInDays(parseISO(initialState.nationalIdExpiry), Date.now()), //calculatedValue
            kycNextReviewDays: differenceInDays(parseISO(initialState.kycNextReviewDate), Date.now()),
            currentStatus: EMPLOYMENT_STATUS.EMPLOYED, // TODO - How to find this value
            newStatus: EMPLOYMENT_STATUS.EMPLOYED,
            newemployerName: initialState.employerName,
            newCompany: initialState.company,
            newSalary: initialState.salary,
            newAnnualIncome: initialState.annualIncome,
            country: null,
            loginUser: LOGIN_USER_TYPE.CUSTOMER, // based on login
            customerSegment,
            jointAccount: initialState.jointProfiles !== null
    }    
    return targetState
}

export {
    transformInitialState
};

