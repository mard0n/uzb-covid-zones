import { RouteComponentProps, RouteProps } from "react-router-dom";
import { IDecisionTree, IIfCondition } from "../../common/decisionTree/interface";

export enum RISK_LEVEL {
    L1 = 'L1',
    L2 = 'L2',
    L3 = 'L3',
}

export enum EMPLOYMENT_STATUS {
    EMPLOYED,
    SELF_EMPLOYED,
    NOT_EMPLOYED
}

export enum SEGMENT {
    RETAIL= 'RETAIL',
    SME='SME'
}

// export type AssertFunction = (data:any) => boolean | string | undefined

export type TRouteConfig = {[key: string]: IRouteConfigObject} 

export type RoutableComponentProps = Partial<{ routes: Array<IRouteConfigObject> } & RouteComponentProps>

// export interface IDecisionTree {
//     desc?: string,
//     assert: AssertFunction,
//     if: IIfCondition
// }

// export interface IReturnType {
//     return: {
//         riskLevel?: RISK_LEVEL,
//         nextRoute: string,
//         testObject?: any
//     }
// }

// export interface IIfCondition {
//     [key: string]: Partial<IDecisionTree & IReturnType>
// } 

export interface IRouteConfigObject {
    path: string
    component: React.FC<RoutableComponentProps>
    routes? : Array<IRouteConfigObject>
    nextRoute?: string
    if?: IIfCondition
}