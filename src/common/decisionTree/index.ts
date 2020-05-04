import { IDecisionTree, IReturnType } from "./interface"

const decision = (data: any, decisionTree: IDecisionTree) => {
    const processNext = (currentTree: IDecisionTree) => {
        const runNext = (nextTree: IDecisionTree) => {
            const result = nextTree.assert(data)
            const nextStep = nextTree.if[`${result}`] || nextTree.if.default
            if(nextStep) {
                processNext(nextStep as IDecisionTree);
            } else {
                console.log('oops no more steps')
            }
        }

        // const stepTree = result ? dTree[result] : dTree
        if('return' in currentTree) {
            const finalResult: IReturnType<string,any> =  currentTree['return']
            return finalResult;
        } else {
            runNext(currentTree); // resolve with promise
        }
    }
    processNext(decisionTree)
}