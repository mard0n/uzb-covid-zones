import { IDecisionTree } from "../../../common/decisionTree/interface";
import { IKycState, EMPLOYMENT_STATUS, SEGMENT } from "../types";

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
  assert: (data: IKycState) =>
    data.currentStatus === EMPLOYMENT_STATUS.EMPLOYED,
  if: {
    true: {
      return: {
        pathname: "/kyc/employment/salaried",
        state: { titleKey: "kyc.message.futureExpiryUBO" }
      }
    },
    false: {
      assert: (data: IKycState) =>
        data.currentStatus === EMPLOYMENT_STATUS.SELF_EMPLOYED,
      if: {
        true: {
          return: {
            pathname: "/kyc/employment/selfEmployed",
            state: { titleKey: "kyc.message.futureExpiryUBO" }
          }
        },
        false: {
          assert: (data: IKycState) =>
            data.currentStatus === EMPLOYMENT_STATUS.NOT_EMPLOYED,
          if: {
            true: {
              return: {
                pathname: "/kyc/employment/unemployed",
                state: { titleKey: "kyc.message.futureExpiryUBO" }
              }
            },
            false: {
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
};

const INCOME_CONDITION_UNKNOWN_EMPLOYMENT: IDecisionTree = {
  assert: (data: IKycState) =>
    data.currentStatus === EMPLOYMENT_STATUS.EMPLOYED,
  if: {
    true: {
      return: {
        pathname: "/kyc/employment/salaried/income",
      }
    },
    false: {
      assert: (data: IKycState) =>
        data.currentStatus === EMPLOYMENT_STATUS.SELF_EMPLOYED,
      if: {
        true: {
          return: {
            pathname: "/kyc/employment/selfEmployed/income",
          }
        },
        false: {
          assert: (data: IKycState) =>
            data.currentStatus === EMPLOYMENT_STATUS.NOT_EMPLOYED,
          if: {
            true: {
              return: {
                pathname: "/kyc/employment/unemployed/income",
              }
            }
          }
        }
      }
    }
  }
};

const POST_EMPLOYMENT_CHECK: IDecisionTree = {
  assert: (data: IKycState) =>
    data.currentStatus === EMPLOYMENT_STATUS.EMPLOYED,
  if: {
    true: {
      assert: (data: IKycState) => data.customerSegment === SEGMENT.WEALTH,
      if: {
        true: {
          return: {
            pathname: "/kyc/wealth"
          }
        },
        false : {
          return: {
            pathname: "/kyc/document"
          }
        }
      }
    },
    false: {
      assert: (data: IKycState) =>
      data.currentStatus === EMPLOYMENT_STATUS.SELF_EMPLOYED,
      if: {
        true: {
          return: {
            pathname: "/kyc/business"
          }
        },
        false : {
          assert: (data: IKycState) =>
           data.currentStatus === EMPLOYMENT_STATUS.NOT_EMPLOYED,
           if: {
             true: {
              assert: (data: IKycState) => data.customerSegment === SEGMENT.WEALTH,
              if: {
                true: {
                  return: {
                    pathname: "/kyc/wealth",
                  }
                },
                false : {
                  return: {
                    pathname: "/kyc/document"
                  }
                }
              }
             }
             //Default value??
           }
        }
      }
    }
  }
};

export {
  PRE_PROFILE_PAGE_CONDITION,
  EMPLOYMENT_CONDITION,
  POST_EMPLOYMENT_CHECK,
  INCOME_CONDITION_UNKNOWN_EMPLOYMENT
};
