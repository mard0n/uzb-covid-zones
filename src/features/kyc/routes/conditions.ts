import { IDecisionTree } from "../../../common/decisionTree/interface";
import { IKycState, EMPLOYMENT_STATUS } from "../types";

const RISK_LEVEL_FREEZE: { [key: string]: number } = {
  Level1: 180,
  Level2: 90,
  Level3: 30
};

const PRE_PROFILE_PAGE_CONDITION: IDecisionTree = {
  assert: (data: IKycState) => data.jointAccount,
  if: {
    true: {
      return: {
        pathname: "/kyc/profile",
        state: { titleKey: "kyc.message.jointFutureDate" }
      }
    },
    false: {
      //TODO: Add this condition --> && source === "UBO"
      assert: (data: IKycState) =>
        data.kycExpiredDays < 0 && -data.kycExpiredDays > 90,
      if: {
        true: {
          return: {
            pathname: "/kyc/profile",
            state: { titleKey: "kyc.message.futureExpiryUBO" }
          }
        },
        false: {
          assert: (data: IKycState) =>
            data.kycExpiredDays < 0 && -data.kycExpiredDays > 90,
          if: {
            true: {
              return: {
                pathname: "/kyc/profile",
                state: { titleKey: "kyc.message.futureExpiry" }
              }
            },
            false: {
              //TODO: add condition
              assert: (data: IKycState) =>
                RISK_LEVEL_FREEZE[data.riskLevel] - data.kycExpiredDays <= 0,
              if: {
                true: {
                  return: {
                    pathname: "/kyc/profile",
                    state: { titleKey: "kyc.message.expiredBeyondFreeze" }
                  }
                },
                false: {
                  assert: (data: IKycState) =>
                    RISK_LEVEL_FREEZE[data.riskLevel] - data.kycExpiredDays >
                    30,
                  if: {
                    true: {
                      return: {
                        pathname: "/kyc/profile",
                        state: { titleKey: "kyc.message.expiredMoreThan30" }
                      }
                    },
                    false: {
                      return: {
                        pathname: "/kyc/profile",
                        state: { titleKey: "kyc.message.expiredLessThan30" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

const EMPLOYMENT_CONDITION: IDecisionTree = {
  assert: (data: IKycState) => data.currentStatus === EMPLOYMENT_STATUS.EMPLOYED,
  if : {
    true : {
      return: {
        pathname: "/kyc/employment/salaried",
        state: { titleKey: "kyc.message.futureExpiryUBO" }
      }
    },
      false : {
        assert: (data: IKycState) => data.currentStatus === EMPLOYMENT_STATUS.SELF_EMPLOYED,
        if : {
          true : {
            return: {
              pathname: "/kyc/employment/selfEmployed",
              state: { titleKey: "kyc.message.futureExpiryUBO" }
            }
          }, 
          false : {
            assert: (data: IKycState) => data.currentStatus === EMPLOYMENT_STATUS.NOT_EMPLOYED,
            if : {
              true : {
                return: {
                  pathname: "/kyc/employment/unemployed",
                  state: { titleKey: "kyc.message.futureExpiryUBO" }
                }
              }, 
              false : {
                return: {
                  pathname: "/kyc/employment/unknown",
                  state: { titleKey: "kyc.message.futureExpiryUBO" }
                }
              }
            }
          }
        }
      }
    }
  }

export { PRE_PROFILE_PAGE_CONDITION, EMPLOYMENT_CONDITION };
