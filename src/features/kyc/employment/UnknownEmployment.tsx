import React, { useState, useEffect } from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Switch, useRouteMatch } from 'react-router-dom';
import { RoutableComponentProps, UPDATE_ACTIVE_PROFILE, EMPLOYMENT_STATUS } from '../types';
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';
import useExecuteDecision from '../store/hooks/useExecuteDecision';
import { INCOME_CONDITION_UNKNOWN_EMPLOYMENT } from '../routes/conditions';

const UnknownEmploymentView : React.FC<RoutableComponentProps> = ({route, location, history}) => {
    let { url } = useRouteMatch();
    const { t } = useTranslation();
    const state = location && location.state ? location.state : {};
    const { dispatch, outcome } = useExecuteDecision("customerName",
    INCOME_CONDITION_UNKNOWN_EMPLOYMENT
  );
  const [payload, setPayload] = useState({});

    // useEffect(() => {
    //     debugger;
    //     console.log('outcome in unknown employment', outcome);
    // outcome && history!.push(outcome);
    // }, [outcome]);

    const continueToNext = () => {
        console.log("payload", payload);
        dispatch({type: UPDATE_ACTIVE_PROFILE, payload: payload})
    }

    const radioCheck = (value: any) => {
        setPayload({newStatus : value})
    }

    return (
        <>
            <h2>{url}</h2>
            <h2>Unkown Employment</h2>
            <div>
            <input
                name="work"
                type="radio"
                onChange={() => radioCheck(EMPLOYMENT_STATUS.SELF_EMPLOYED)}
            />
            <label>
                I work for myself
            </label>
            </div>
            <div>
            <input
                name="work"
                type="radio"
                onChange={() => radioCheck(EMPLOYMENT_STATUS.EMPLOYED)}
            />
            <label>
            <label>
                I work for a new company
            </label>
            </label>
            </div>
            <div>
            <input
                name="work"
                type="radio"
                onChange={() => radioCheck(EMPLOYMENT_STATUS.NOT_EMPLOYED)}
            />
            <label>
                I currently do not have a job
            </label>
            </div>
            <Button  variant="contained" color="primary" onClick={continueToNext} size="medium">No</Button>

            <Switch>
                {route && renderRoutes(route.routes)}
            </Switch>
            {/* <RouteConfig routes={props.routes || []}/> */}
        </>    
    )
}

export default UnknownEmploymentView;