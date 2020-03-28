import React from "react";
import ReactDOM from "react-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import PageNotFound from "./PageNotFound";
import PrivateRoute from "./PrivateRoute";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/signup" />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/dashboard" authComponent={Dashboard} />
        <Route component={PageNotFound}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
