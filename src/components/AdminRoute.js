import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function AdminRoute({ component: Component, ...rest }) {
  const userSign = useSelector((state) => state.userSign);
  const { userInfo } = userSign;
  return (
            <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    ></Route>
  
  )
}