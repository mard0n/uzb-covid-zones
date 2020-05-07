import React, { useEffect } from 'react';
import { useRouteMatch, RouteComponentProps, Switch, useLocation } from 'react-router-dom';
import RouteConfig from './routes/RouteConfig';
import routeConfigs from './routes/config';
import { RoutableComponentProps } from './interface';
import { transformInitialState } from './helpers';
import { renderRoutes, matchRoutes } from 'react-router-config';

const Kyc: React.FC<RoutableComponentProps> = ({history, location}) => {
    const {url} = useRouteMatch();
    // const {location} = useLocation();

    /* TODO: remove this once API integration is done */
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
        transformInitialState(initialState);
    },[])


    return (
    <> 
        <button onClick={() => history && history.push('/kyc/profile')}>profile</button>
        {renderRoutes(routeConfigs)}
        {/* <RouteConfig routes={routeConfigs[url].routes} /> */}
    </>
    )
}

export default Kyc;