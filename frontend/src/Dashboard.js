import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SimpleChart from "./SimpleChart";

export default class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      data: null,
      loading: true
    };
  }

  retriveData = async () => {
    let token = document.cookie.split("=")[1];
    if (token === undefined) token = "";
    let url = "http://localhost:4000/data";
    const HTTPGet = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "x-access-token": token
      },
      method: "GET"
    };
    let retrivedData = "";
    let isValid;
    retrivedData = await fetch(url, HTTPGet).then(response => response.json());
    if (retrivedData.data) {
      isValid = true;
    } else if (retrivedData.error === "unauthorized") {
      isValid = false;
    }
    this.setState({
      authenticated: isValid,
      loading: false,
      data: retrivedData.data
    });
  };

  render() {
    if (this.state.loading) {
      this.retriveData();
      return <div>Checking authorization</div>;
    } else {
      if (this.state.authenticated) {
        return <SimpleChart data={this.state.data}></SimpleChart>;
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
  }
}
