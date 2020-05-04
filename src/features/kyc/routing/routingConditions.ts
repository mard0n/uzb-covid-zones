import { IDecisionTree } from "../../../common/decisionTree/interface";
import { RISK_LEVEL } from "../interface";

const initialCondition: IDecisionTree = {
    assert: (data: any) => data.country === 'africa',
    if: {
      true: {
        assert: (data: any) => 'something',
        if: {
          true: {
            return: {
              nextRoute: '/income/updateNotAvailable',
              riskLevel: RISK_LEVEL.L3
            }
          },
          false: {
            return: {
              nextRoute: 'hello123'
            }
          }
        }
      },
      false: {
        return: {
          nextRoute: ""
        },
      },
      default: {
        return: {
          nextRoute: ""
        },
      },
    },
  };

export {
    initialCondition
}