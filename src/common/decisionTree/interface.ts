
export type AssertFunction = (data:any) => string | boolean;

export interface IReturnType<T, U> {
    [T: string]: U
}

export interface IIfCondition {
    [key: string]: IDecisionTree | IReturnType<string,any>
} 

export type ConditonFunction = () => any;

export type conditionType = IDecisionTree | ConditonFunction

export interface IDecisionTree {
    desc?: string,
    assert: AssertFunction,
    if: IIfCondition
}

export type decisionPropsType = {
    data: any,
    condition: conditionType,
}