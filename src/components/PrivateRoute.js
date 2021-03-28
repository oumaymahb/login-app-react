import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import * as jwt_decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const userToken = localStorage.getItem("token")
console.log(userToken)
  return (
    <Route {...rest} render={props =>
      userToken ? (
        <Component {...props} />
        
      ) : (
        <Redirect to='/login'/>
      )
    }
    />
  );
};

export default PrivateRoute;