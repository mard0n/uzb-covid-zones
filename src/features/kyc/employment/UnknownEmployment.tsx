import React, { useState, useEffect } from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Switch, useRouteMatch } from 'react-router-dom';
import { RoutableComponentProps } from '../types';
import { useTranslation } from "react-i18next";

const UnknownEmploymentView : React.FC<RoutableComponentProps> = ({route, location}) => {
    let { url } = useRouteMatch();
    const { t } = useTranslation();
    const state = location && location.state ? location.state : {};

    console.log('props.routes', route)
    console.log('props.location', location)
    // const branch = matchRoutes(routeConfigs, "/kyc/profile");
    // console.log('matchRoutes',branch)
    return (
        <>
            <h2>{url}</h2>
            <h2>Unkown Employment</h2>
            <Switch>
                {route && renderRoutes(route.routes)}
            </Switch>
            {/* <RouteConfig routes={props.routes || []}/> */}
        </>    
    )
}

export default UnknownEmploymentView;