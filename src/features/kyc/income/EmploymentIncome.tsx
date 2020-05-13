import React, { useState, useEffect } from "react";
import { renderRoutes, matchRoutes } from "react-router-config";
import { Switch, useRouteMatch } from "react-router-dom";
import { RoutableComponentProps, UPDATE_ACTIVE_PROFILE } from "../types";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import useKycState from "../store/hooks/useKycState";
import { POST_EMPLOYMENT_CHECK } from "../routes/conditions";
import useExecuteDecision from "../store/hooks/useExecuteDecision";

const EmploymentIncome: React.FC<RoutableComponentProps> = ({
  route,
  location,
  history
}) => {
  const { t } = useTranslation();
  const state = location && location.state ? location.state : {};
  const { active } = useKycState();
  const { dispatch, outcome } = useExecuteDecision("salary",
    POST_EMPLOYMENT_CHECK
  );

  const [salary, setSalary] = useState(active.salary);

  const updateSalary = (e: any) => {
    let inputValue = e.target.value;
    setSalary(inputValue);
  };

  // useEffect(() => {
  //     console.log('outcome in employment', outcome);
  //   outcome && history!.push(outcome);
  // }, [outcome]);

  return (
    <>
      <h2>Employment Salary </h2>
      <input id="salary" value={salary} onChange={updateSalary} />

      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          dispatch({ type: UPDATE_ACTIVE_PROFILE, payload: { salary: salary } })
        }
        size="medium"
      >
        Continue
      </Button>

      <Switch>{route && renderRoutes(route.routes)}</Switch>
      {/* <RouteConfig routes={props.routes || []}/> */}
    </>
  );
};

export default EmploymentIncome;
