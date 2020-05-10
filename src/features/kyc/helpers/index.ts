import {parseISO, differenceInDays} from 'date-fns'
import { LOGIN_USER_TYPE, IProfileResponse, IKycState, RISK_LEVEL, CUSTOMER_IDENTIFIER_MAPPING, SEGMENT, EMPLOYMENT_STATUS } from "../types";


const transformInitialState = (initialState: IProfileResponse) : Array<IKycState> => {

    const {jointProfiles, ...rest} = initialState;
    let profiles: Array<IProfileResponse> = [ {...rest, jointProfiles} ]
    if(jointProfiles) {
        profiles = [...profiles, ...jointProfiles]
    }

    // organize initial state as set of profiles
    let targetProfiles: Array<IKycState> = profiles.map((profile, index: number) => {
        let defaultRiskLevel: number = RISK_LEVEL.L3;
        if(profile.riskLevel) {
            const match =  profile.riskLevel.match(/(\d+)/)
            defaultRiskLevel = match ? parseInt(match[0]) : defaultRiskLevel;
        }

        const riskLevelForCustomerIdentifier: CUSTOMER_IDENTIFIER_MAPPING = parseInt((<any>CUSTOMER_IDENTIFIER_MAPPING)[profile.customerIdentifier])
        let customerSegment = SEGMENT.RETAIL;
        if(profile.customerSegment === "CUSTGOLD" 
            || profile.customerSegment === "CUSTPVT" ) {
                customerSegment = SEGMENT.WEALTH;
        }


        const targetState: IKycState = {
                ...profile,
                defaultRiskLevel,
                newRiskLevel: Math.max(defaultRiskLevel, riskLevelForCustomerIdentifier),
                nationalIdExpiryDays: differenceInDays(parseISO(profile.nationalIdExpiry), Date.now()), //calculatedValue
                kycNextReviewDays: differenceInDays(parseISO(profile.kycNextReviewDate), Date.now()),
                currentStatus: EMPLOYMENT_STATUS.EMPLOYED, // TODO - How to find this value
                newStatus: EMPLOYMENT_STATUS.EMPLOYED,
                newemployerName: profile.employerName,
                newCompany: profile.company,
                newSalary: profile.salary,
                newAnnualIncome: profile.annualIncome,
                country: null,
                loginUser: LOGIN_USER_TYPE.CUSTOMER, // based on login
                customerSegment,
                jointAccount: profile.jointProfiles !== null,
                primaryProfile: index === 0 ? true : false
        }    
        return targetState
    })

    return targetProfiles;
}

export {
    transformInitialState
};

