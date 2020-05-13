import React, { useState, useEffect } from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Switch, useRouteMatch } from 'react-router-dom';
import { RoutableComponentProps } from '../types';
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';

const SelfEmploymentIncome : React.FC<RoutableComponentProps> = ({route, location}) => {
    let { url } = useRouteMatch();
    const { t } = useTranslation();
    const state = location && location.state ? location.state : {};

    // const branch = matchRoutes(routeConfigs, "/kyc/profile");
    // console.log('matchRoutes',branch)
    return (
        <>
            <h2>{url}</h2>
            <h2>Employment Income </h2>

            <Switch>
                {route && renderRoutes(route.routes)}
            </Switch>
            {/* <RouteConfig routes={props.routes || []}/> */}
        </>    
    )
}

export default SelfEmploymentIncome;