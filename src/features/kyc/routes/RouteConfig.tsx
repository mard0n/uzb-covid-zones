import React from 'react';
import { RouteComponentProps, useRouteMatch, Route, Switch } from 'react-router-dom';
import { IRouteConfigObject } from '../types';
// import routeConfigs from './routeConfig';

type Props = {
    routes: Array<IRouteConfigObject> | undefined
}

const RouteConfig: React.FC<Props> = ({routes}) => {
 
 const { url }  = useRouteMatch(); 

 return (
    <> 
        <Switch>
        {routes && routes.map((route,i) => {
            // const config: IRouteConfigObject = routes[routeKey];
            // const completePath: string = `${match.url}/:subroute`
            const completePath: string = `${url}${route.path}`
            console.log(route, completePath)
            return (
                <Route
                    key={i}
                    path={completePath}
                    render={props => (
                        <route.component routes={route.routes}/>
                    )}
                />
            )
        })}
        </Switch>
    </>
 )
}

export default RouteConfig;