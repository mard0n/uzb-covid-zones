import { SFC, FC, Dispatch, useEffect, useState } from "react";
import useKycDispatch from "./useKycDispatch";
import { decisionPropsType, IDecisionTree } from "../../../../common/decisionTree/interface";
import useDecision from "../../../../common/decisionTree/useDecision";
import useKycState from "./useKycState";

const useExecuteDecision = (tracker: string, condition: IDecisionTree) =>  {

    const dispatch = useKycDispatch()
    const {active : {[tracker] : stateKey},active} = useKycState()
    const {execute, outcome} = useDecision(active, condition)

    useEffect(() => {
        console.log("tracker", tracker, stateKey, active);
        stateKey && execute()
    },[stateKey])

    return {
        dispatch,
        outcome
    }
}

export default useExecuteDecision;