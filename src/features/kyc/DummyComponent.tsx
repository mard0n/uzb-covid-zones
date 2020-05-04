import React, { FC } from 'react';
import { useRouteMatch, RouteComponentProps, RouteProps } from "react-router-dom"
import { IRouteConfigObject, RoutableComponentProps } from './interface';
import RouteConfig from './routing/RouteConfig';

// type Props = RoutableComponentProps;

const DummyComponent: React.FC<RoutableComponentProps> = (props) => {
    let { url } = useRouteMatch();
    return (
        <>
            <h2>{url}</h2>
            <RouteConfig routes={props.routes || []}/>
        </>    
    )
}

export default DummyComponent;