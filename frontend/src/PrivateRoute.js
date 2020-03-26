import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export default class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      loading: true
    };
  }

  checkTokenValidity = async () => {
    let token = document.cookie.split("=")[1];
    if (token === undefined) token = "";
    let url = "http://localhost:4000/test";
    const HTTPGet = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "x-access-token": token
      },
      method: "GET"
    };
    let data = "";
    try {
      data = await fetch(url, HTTPGet).then(response => response.json());
    } catch (error) {
      console.log("errore", error);
    }
    let isValid;
    if (data.status === "ok") {
      isValid = true;
    } else if (data.error === "unauthorized") {
      isValid = false;
    }
    this.setState({
      authenticated: isValid,
      loading: false
    });
  };

  showContent = () => {
    if (this.state.loading) {
      this.checkTokenValidity();
      return <div>Checking authorization</div>;
    } else {
      if (this.state.authenticated) {
        return (
          <Route
            {...this.rest}
            render={props => <this.props.authComponent {...props} />}
          />
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/signin",
              from: this.props.location
            }}
          />
        );
      }
    }
  };

  render() {
    return this.showContent();
  }
}
