import { RouteComponentProps, RouteProps } from "react-router-dom";
import { IDecisionTree, IIfCondition } from "../../common/decisionTree/interface";
import { RouteConfig, RouteConfigComponentProps } from "react-router-config";

export enum RISK_LEVEL {
    L1 = 1,
    L2 = 2,
    L3 = 3,
}

export enum CUSTOMER_IDENTIFIER_MAPPING {
    IND_SAL_NORM = RISK_LEVEL.L1,
    IND_OTH_MINR = RISK_LEVEL.L2,
    IND_OTH_HWFE = RISK_LEVEL.L2,
    IND_SAL_RESX = RISK_LEVEL.L3,
    IND_OTH_NRNR = RISK_LEVEL.L3,
    IND_SAL_NRNR = RISK_LEVEL.L2, // not sure
    IND_OTH_PEPX = RISK_LEVEL.L3,
    IND_SAL_PEPX = RISK_LEVEL.L3,
    SLF_NOR_NORM = RISK_LEVEL.L2,
    SLF_OTH_RESX = RISK_LEVEL.L3,
    IND_EMP_UEMP = RISK_LEVEL.L2, // not sure
    IND_OTH_AMLX = RISK_LEVEL.L3,
    IND_SAL_AMLX = RISK_LEVEL.L3,
}

export enum EMPLOYMENT_STATUS {
    EMPLOYED,
    SELF_EMPLOYED,
    NOT_EMPLOYED
}

export enum SEGMENT {
    RETAIL = 'RETAIL',
    SME ='SME'
}

export type TRouteConfig = Array<IRouteConfigObject>

export type RoutableComponentProps = Partial<{ routes: Array<IRouteConfigObject> } & RouteConfigComponentProps>

export interface IRouteConfigObject extends RouteConfig {
    path: string
    component: React.FC<RoutableComponentProps>
    routes? : Array<IRouteConfigObject>
    nextRoute?: string
    if?: IIfCondition
}