import React, { useState, useEffect } from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Switch, useRouteMatch } from 'react-router-dom';
import { RoutableComponentProps, TRIGGER_EMPLOYMENT_CHANGE } from '../types';
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';
import useExecuteDecision from '../store/hooks/useExecuteDecision';
import { EMPLOYMENT_INCOME } from '../routes/conditions';

const SalariedEmploymentView : React.FC<RoutableComponentProps> = ({route, location, history}) => {
    let { url } = useRouteMatch();
    const { t } = useTranslation();
    const state = location && location.state ? location.state : {};
    const { dispatch, outcome } = useExecuteDecision("employmentStatusChange", EMPLOYMENT_INCOME);

    useEffect(() => {
        console.log("Salaries page",outcome,history)
         outcome && history!.push(outcome)
    },[history, outcome])

    const goToYes = () => {
        dispatch({type: TRIGGER_EMPLOYMENT_CHANGE, payload: {employmentStatusChange: false} })
    }
    const goToNo = () => {
        dispatch({type: TRIGGER_EMPLOYMENT_CHANGE, payload: {employmentStatusChange: true} })
    }
    
    return (
        <>
            <h2>{url}</h2>
            <h2>Salaried </h2>

            <Button  variant="contained" color="primary" onClick={goToYes } size="medium">Yes</Button>
            <Button  variant="contained" color="primary" onClick={goToNo} size="medium">No</Button>
            <Switch>
                {route && renderRoutes(route.routes)}
            </Switch>
            {/* <RouteConfig routes={props.routes || []}/> */}
        </>    
    )
}

export default SalariedEmploymentView;