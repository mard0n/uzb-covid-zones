import React, { FC } from 'react';
import { useRouteMatch, Switch } from "react-router-dom"
// import RouteConfig from './routes/RouteConfig';
import { renderRoutes, matchRoutes } from "react-router-config";
import routeConfigs from './routes/config';
import { RoutableComponentProps } from './types';

// type Props = RoutableComponentProps;

const DummyComponent: React.FC<RoutableComponentProps> = (props) => {
    let { url } = useRouteMatch();
    const branch = matchRoutes(routeConfigs, "/kyc/profile");
    return (
        <>
            <Switch>
                {props.route && renderRoutes(props.route.routes)}
            </Switch>
            {/* <RouteConfig routes={props.routes || []}/> */}
        </>    
    )
}

export default DummyComponent;