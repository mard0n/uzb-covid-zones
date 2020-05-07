import { CUSTOMER_IDENTIFIER_MAPPING, RISK_LEVEL, SEGMENT, EMPLOYMENT_STATUS } from "../interface";
import {parseISO, differenceInDays} from 'date-fns'

interface IInputArgs {
    customerName: string,
    accountNumber: number | null,
    nationalIdExpiry: string,
    salary: string,
    employerName: string,
    riskLevel: string,
    company: string | null,
    annualIncome: number,
    kycNextReviewDate: string,
    customerIdentifier: string,
    customerSegment: string,
    highRiskCountryNational: boolean,
    firstName: string,
    newRecord: boolean,
    gcc: boolean,
    id: number,
    jointProfiles: null,
};

interface ITargetState extends IInputArgs {
    defaultRiskLevel: number,
    newRiskLevel: number,
    nationalIdExpiryDays: number,
    kycNextReviewDays: number,
}


const transformInitialState = (initialState: IInputArgs) => {

    let defaultRiskLevel: number = RISK_LEVEL.L3;
    if(initialState.riskLevel) {
        const match =  initialState.riskLevel.match(/(\d+)/)
        defaultRiskLevel = match ? parseInt(match[0]) : defaultRiskLevel;
    }

    const riskLevelForCustomerIdentifier: CUSTOMER_IDENTIFIER_MAPPING = parseInt((<any>CUSTOMER_IDENTIFIER_MAPPING)[initialState.customerIdentifier])

    const targetState = {
        kyc: {
            defaultRiskLevel,
            newRiskLevel: Math.max(defaultRiskLevel, riskLevelForCustomerIdentifier),
            nationalIdExpiryDays: differenceInDays(parseISO(initialState.nationalIdExpiry), Date.now()), //calculatedValue
            kycNextReviewDays: differenceInDays(parseISO(initialState.kycNextReviewDate), Date.now()),
            currentStatus: EMPLOYMENT_STATUS, // TODO - How to find this value
            newStatus: EMPLOYMENT_STATUS,
            newemployerName: initialState.employerName,
            newCompany: initialState.company,
            newSalary: initialState.salary,
            newAnnualIncome: initialState.annualIncome,
            country: null,
            ...initialState
        }
    }    
    return targetState
}

export {
    transformInitialState
};

