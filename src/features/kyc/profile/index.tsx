import React, { useState, useEffect } from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Switch, useRouteMatch } from 'react-router-dom';
import { RoutableComponentProps } from '../types';
import { useTranslation } from "react-i18next";
import { Button } from "@mashreq-digital/ui";
import { EMPLOYMENT_CONDITION } from "../routes/conditions";
import useKycState from '../store/hooks/useKycState';
import useDecision from '../../../common/decisionTree/useDecision';

const ProfileView : React.FC<RoutableComponentProps> = ({route, location, history}) => {
    let { url } = useRouteMatch();
    const { t } = useTranslation();
    const state = location && location.state ? location.state : {};
    const { active } = useKycState()
    const {execute, outcome} = useDecision(active, EMPLOYMENT_CONDITION)

    const [title, setTitle] = useState("");

    useEffect(() => {
       if ("titleKey" in state) {
           setTitle(state["titleKey"]);
       }
    }, [state])

    console.log('props.routes', route)
    console.log('props.location', location)
    // const branch = matchRoutes(routeConfigs, "/kyc/profile");
    // console.log('matchRoutes',branch)

    useEffect(() => {
        outcome &&  history!.push(outcome);
    }, [history, outcome])

    return (
        <>
            <h2>{url}</h2>
            <h3>{t(title)}</h3>
            {/* renderRoutes(routeConfigs) */}
            <Button  variant="contained" color="primary" onClick={execute} size="medium">Next</Button>

            <Switch>
                {route && renderRoutes(route.routes)}
            </Switch>
            {/* <RouteConfig routes={props.routes || []}/> */}
        </>    
    )
}

export default ProfileView;