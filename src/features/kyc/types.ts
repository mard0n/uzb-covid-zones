import { RouteConfig, RouteConfigComponentProps } from "react-router-config";
import { conditionType } from "../../common/decisionTree/interface";

/**
 * Profile Types
 */

export const UPDATE_INITIAL_STATE = "UPDATE_INITIAL_STATE";
export const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";
export const UPDATE_LOGIN_TYPE = "UPDATE_LOGIN_TYPE";

/**
 * Active Profiles
 */
export const SET_ACTIVE_PROFILE = "SET_ACTIVE_PROFILE";

/**
 * Employement Types
 */
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

/**
 * Generic Types
 */
export const ERROR = "ERROR";
export const RESET_ERROR = "RESET_ERROR";

export interface IProfileResponse {
  customerName: string;
  accountNumber: number | null;
  nationalIdExpiry: string;
  salary: string;
  employerName: string;
  riskLevel: string;
  company: string | null;
  annualIncome: number;
  kycNextReviewDate: string;
  customerIdentifier: string | null;
  customerSegment: string;
  highRiskCountryNational: boolean;
  firstName: string;
  newRecord: boolean;
  gcc: boolean;
  id: number;
  jointProfiles: null | [IProfileResponse];
}

export interface IKycState extends IProfileResponse {
  defaultRiskLevel: number;
  newRiskLevel: number;
  nationalIdExpiryDays: number;
  kycExpiredDays: number;
  customerSegment: SEGMENT;
  loginUser: LOGIN_USER_TYPE;
  currentStatus: EMPLOYMENT_STATUS;
  newStatus: EMPLOYMENT_STATUS;
  newemployerName: string;
  newCompany: string | null;
  newSalary: string;
  newAnnualIncome: number;
  country: string | null;
  jointAccount: boolean;
  primaryProfile: boolean;
}

export enum RISK_LEVEL {
  L1 = 1,
  L2 = 2,
  L3 = 3
}

export enum CUSTOMER_IDENTIFIER_MAPPING {
  IND_SAL_NORM = RISK_LEVEL.L1,
  IND_OTH_MINR = RISK_LEVEL.L2,
  IND_OTH_HWFE = RISK_LEVEL.L2,
  IND_SAL_RESX = RISK_LEVEL.L3,
  IND_OTH_NRNR = RISK_LEVEL.L3,
  IND_SAL_NRNR = RISK_LEVEL.L3,
  IND_OTH_PEPX = RISK_LEVEL.L3,
  IND_SAL_PEPX = RISK_LEVEL.L3,
  SLF_NOR_NORM = RISK_LEVEL.L2,
  SLF_OTH_RESX = RISK_LEVEL.L3,
  IND_EMP_UEMP = RISK_LEVEL.L2,
  IND_OTH_AMLX = RISK_LEVEL.L3,
  IND_SAL_AMLX = RISK_LEVEL.L3
}

export enum EMPLOYMENT_STATUS {
  EMPLOYED,
  SELF_EMPLOYED,
  NOT_EMPLOYED,
  UNKNOWN
}

export enum LOGIN_USER_TYPE {
  CUSTOMER,
  STAFF,
  RM
}

export enum SEGMENT {
  RETAIL = "RETAIL",
  SME = "SME",
  WEALTH = "WEALTH"
}

export type routeConfigType = Array<IRouteConfigObject>;

export type RoutableComponentProps = Partial<
  { routes: Array<IRouteConfigObject> } & RouteConfigComponentProps
>;

export interface IRouteConfigObject extends RouteConfig {
  path?: string;
  component?: React.FC<RoutableComponentProps>;
  routes?: Array<IRouteConfigObject>;
  // nextRoute?: string
  // if?: IIfCondition
  condition?: conditionType;
}
