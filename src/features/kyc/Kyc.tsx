import React from 'react';
import { useRouteMatch, RouteComponentProps } from 'react-router-dom';
import RouteConfig from './routing/RouteConfig';
import routeConfigs from './routing/Config';
import { RoutableComponentProps } from './interface';

const Kyc: React.FC<RoutableComponentProps> = ({history}) => {
    const {url} = useRouteMatch();

    return (
    <> 
        <button onClick={() => history && history.push('/kyc/profile')}>profile</button>
        <RouteConfig routes={routeConfigs[url].routes} />
    </>
    )
}

export default Kyc;