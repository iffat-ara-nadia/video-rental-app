import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";
import { render } from "react-dom";

const ProtectedRoute = ({ path, component: Component, render }) => {
  //Here we will simply return a route component.
  //Whereever we use a Protected Route component,
  //Output of that component will be a standard Route component in React Router.
  return (
    <Route>
      path={path}
      {/* with{...rest} we can simply add any additional property here. */}
      render =
      {props => {
        //console.log(props);
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    </Route>
  );
};

export default ProtectedRoute;
