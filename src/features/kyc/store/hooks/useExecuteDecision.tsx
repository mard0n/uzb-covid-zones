import { SFC, FC, Dispatch, useEffect, useState } from "react";
import useKycDispatch from "./useKycDispatch";
import { decisionPropsType, IDecisionTree } from "../../../../common/decisionTree/interface";
import useDecision from "../../../../common/decisionTree/useDecision";
import useKycState from "./useKycState";

const useExecuteDecision = (tracker: string, condition: IDecisionTree) =>  {

    const dispatch = useKycDispatch()
    const {profile : {[tracker] : stateKey},profile} = useKycState()
    const {execute, outcome} = useDecision(profile, condition)

    console.log("tracker", tracker, stateKey, profile);

    useEffect(() => {
        stateKey && execute()
    },[execute, stateKey])

    return {
        dispatch,
        outcome
    }
}

export default useExecuteDecision;