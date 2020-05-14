import React, { useState, useEffect } from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Switch, useRouteMatch } from 'react-router-dom';
import { RoutableComponentProps, UPDATE_ACTIVE_PROFILE } from '../types';
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';
import useKycState from "../store/hooks/useKycState";
import { POST_EMPLOYMENT_CHECK } from "../routes/conditions";
import useExecuteDecision from "../store/hooks/useExecuteDecision";

const SelfEmploymentIncome : React.FC<RoutableComponentProps> = ({route, location}) => {
    let { url } = useRouteMatch();
    const { t } = useTranslation();
    const state = location && location.state ? location.state : {};
    const { active } = useKycState();
    const [income, setIncome] = useState(active.income);
    const { dispatch, outcome } = useExecuteDecision("income",
    POST_EMPLOYMENT_CHECK
  );

  const updateIncome = (e: any) => {
    let inputValue = e.target.value;
    setIncome(inputValue);
  };

   // useEffect(() => {
  //     console.log('outcome in employment', outcome);
  //   outcome && history!.push(outcome);
  // }, [outcome]);

    return (
        <>
            <h2>{url}</h2>
            <h2>Self Employment Income </h2>
            <input id="income" value={income} onChange={updateIncome} />

            <Button
            variant="contained"
            color="primary"
            onClick={() =>
                dispatch({ type: UPDATE_ACTIVE_PROFILE, payload: { income: income } })
            }
            size="medium"
            >
            Continue
            </Button>

            <Switch>
                {route && renderRoutes(route.routes)}
            </Switch>
            {/* <RouteConfig routes={props.routes || []}/> */}
        </>    
    )
}

export default SelfEmploymentIncome;