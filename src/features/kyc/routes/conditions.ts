import { IDecisionTree } from "../../../common/decisionTree/interface";
import { RISK_LEVEL, IKycState } from "../types";

const PRE_PROFILE_PAGE_CONDITION: IDecisionTree = {
    assert: (data: IKycState) => data.jointAccount,
    if: {
      true: {
        return: {
          pathname: '/kyc/profile',
          state: { titleKey: 'kyc.message.jointFutureDate' },
        }
      },
      false: {
        assert: (data: IKycState) => !!'akshay',
        if: {
          true: {
            return: {
              pathname: '/kyc/profile',
              state: { titleKey: 'kyc.message.jointFutureDate' },
            }
          },
          false: {
            return: {
              nextRoute: 'hello123'
            }
          }
        }
      },
      default: {
        return: {
          nextRoute: ""
        },
      },
    },
  };

export {
  PRE_PROFILE_PAGE_CONDITION
}