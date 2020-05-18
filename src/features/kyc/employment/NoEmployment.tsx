import React, { useState, useEffect } from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Switch, useRouteMatch } from 'react-router-dom';
import { RoutableComponentProps } from '../types';
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';

const NoEmploymentView : React.FC<RoutableComponentProps> = ({route, location, history}) => {
    let { url } = useRouteMatch();
    const { t } = useTranslation();
    const state = location && location.state ? location.state : {};

    const goToYes = () => {
        history!.push("/kyc/employment/unemployed/income")
    }
    const goToNo = () => {
        history!.push("/kyc/employment/unemployed/verify")
    }
    return (
        <>
            <h2>{url}</h2>
            <h2>No Employment</h2>
            <Button  variant="contained" color="primary" onClick={ goToYes } size="medium">Yes</Button>
            <Button  variant="contained" color="primary" onClick={ goToNo} size="medium">No</Button>

            <Switch>
                {route && renderRoutes(route.routes)}
            </Switch>
            {/* <RouteConfig routes={props.routes || []}/> */}
        </>    
    )
}

export default NoEmploymentView;