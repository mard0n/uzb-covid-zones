
export type AssertFunction = (data:any) => string | boolean;

export interface IReturnType<T, U> {
    [T: string]: U
}

export interface IIfCondition {
    [key: string]: IDecisionTree | IReturnType<string,any>
} 


export interface IDecisionTree {
    desc?: string,
    assert: AssertFunction,
    if: IIfCondition
}