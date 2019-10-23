import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuth} from './apiAuth';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => isAuth() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/signin', state: {from: props.location}}}/>
        )}
    />
);

export default PrivateRoute;