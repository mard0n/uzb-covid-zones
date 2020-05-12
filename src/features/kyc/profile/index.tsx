import React from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Switch, useRouteMatch } from 'react-router-dom';
import { RoutableComponentProps } from '../types';

const ProfileView : React.FC<RoutableComponentProps> = (props) => {
    let { url } = useRouteMatch();
    console.log('props.routes',props.route)
    // const branch = matchRoutes(routeConfigs, "/kyc/profile");
    // console.log('matchRoutes',branch)
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

export default ProfileView;