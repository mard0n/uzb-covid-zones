import React, { useEffect, useReducer } from 'react';
import { useRouteMatch, RouteComponentProps, Switch, useLocation, useHistory } from 'react-router-dom';
// import RouteConfig from './routes/RouteConfig';
import routeConfigs from './routes/config';
import { transformInitialState } from './helpers';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { RoutableComponentProps, UPDATE_INITIAL_STATE } from './types';
import { combinedReducers, combinedState, DispatchContext, StateContext } from './store/context';
// import useKycDispatch from './store/hooks/useKycDispatch';
import useExecuteDecision from './store/hooks/useExecuteDecision';
import { PRE_PROFILE_PAGE_CONDITION } from './routes/conditions';

const KycView: React.FC<RoutableComponentProps> = ({history}) => {
    // const { history } = useHistory();
    // const dispatch = useKycDispatch();
    const { dispatch, outcome } = useExecuteDecision("customerName", PRE_PROFILE_PAGE_CONDITION);

    /* TODO: Make /profile call here */
    useEffect(() => {
        const initialState = {
            customerName: 'TEST_CUSTOMER_010777766',
            accountNumber: null,
            nationalIdExpiry: '2020-05-09',
            salary: '0',
            employerName: '3pms',
            riskLevel: 'Level3',
            company: null,
            annualIncome: 0,
            kycNextReviewDate: '2020-11-11',
            customerIdentifier: 'IND_SAL_AMLX',
            customerSegment: 'RETAIL',
            highRiskCountryNational: false,
            firstName: 'TEST_CUSTOMER_010777766',
            newRecord: false,
            gcc: false,
            id: 0,
            jointProfiles: null,
        };
        // transformInitialState(initialState);
        dispatch({type: UPDATE_INITIAL_STATE, payload: transformInitialState(initialState)})
    },[dispatch])

    useEffect(() => {
        console.log("im am the outcome",outcome,history)
        outcome && history!.push(outcome)
    },[history, outcome])

    return (
    <> 
        <button onClick={() => history && history.push('/kyc/profile')}>profile</button>
        {renderRoutes(routeConfigs)}
        {/* <RouteConfig routes={routeConfigs[url].routes} /> */}
    </>
    )
}

const Kyc: React.FC<RoutableComponentProps> = (props) => {
    const [state, dispatch] = useReducer(combinedReducers, combinedState);
    return (<DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
          <KycView {...props} />
      </StateContext.Provider>
    </DispatchContext.Provider>)
}

export default Kyc;