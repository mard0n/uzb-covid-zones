import React, { FC } from 'react';
import { useRouteMatch, RouteComponentProps, RouteProps, Switch } from "react-router-dom"
import { IRouteConfigObject, RoutableComponentProps } from './interface';
import RouteConfig from './routes/RouteConfig';
import { renderRoutes, matchRoutes } from "react-router-config";
import routeConfigs from './routes/config';

// type Props = RoutableComponentProps;

const DummyComponent: React.FC<RoutableComponentProps> = (props) => {
    let { url } = useRouteMatch();
    console.log('props.routes',props.route)
    const branch = matchRoutes(routeConfigs, "/kyc/profile");
    console.log('matchRoutes',branch)
    return (
        <>
            <h2>{url}</h2>
            <Switch>
                {props.route && renderRoutes(props.route.routes)}
            </Switch>
            {/* <RouteConfig routes={props.routes || []}/> */}
        </>    
    )
}

export default DummyComponent;