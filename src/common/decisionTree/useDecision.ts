import { IDecisionTree, IReturnType, decisionPropsType, conditionType } from "./interface"
import { useState } from "react"

const getDecision = (data: any, decisionTree: IDecisionTree) => {
    const processNext = (currentTree: IDecisionTree) : any => {
        const runNext = (nextTree: IDecisionTree) => {
            const result = nextTree.assert(data)
            const nextStep = nextTree.if[`${result}`] || nextTree.if.default
            if(nextStep) {
                return processNext(nextStep as IDecisionTree);
            } else {
                console.log('oops no more steps')
            }
        }

        // const stepTree = result ? dTree[result] : dTree
        if('return' in currentTree) {
            const finalResult: IReturnType<string,any> =  currentTree['return']
            return finalResult;
        } else {
            return runNext(currentTree); // resolve with promise
        }
    }
    return processNext(decisionTree)
}



const useDecision = (data: any, condition: conditionType) => {

    const [outcome, setOutcome] = useState();

    const execute = () => {
        const ret = typeof condition === 'function' 
            ? condition()
            : getDecision(data, condition)
            console.log("decison", ret);
            setOutcome(ret)
    }
    
    return { execute, outcome }
} 

export default useDecision;