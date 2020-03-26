import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      authError: false
    };

    this.username = React.createRef();
    this.password = React.createRef();
  }

  login = async () => {
    let url = "http://localhost:4000/users/" + this.username.current.value;
    let postData = {
      password: this.password.current.value
    };
    const HTTPPost = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(postData),
      method: "POST"
    };
    let response = await fetch(url, HTTPPost).then(response => response.json());
    if (response.authenticated) {
      document.cookie = "token=" + response.token;
    }
    this.setState({
      authenticated: response.authenticated,
      authError: !response.authenticated
    });
  };

  showError = () => {
    if (this.state.authError) return "Username o password errati";
  };

  render = () => {
    //checks if it comes from a private route
    let { from } = this.props.location;
    //if it doesn't come from a private route it sets the path to be redirected to
    //the dashboard page after the authentication
    if (from === undefined) {
      from = { pathname: "/dashboard", validAuth: true };
    }
    //adds the tag that validates
    else {
      from["validAuth"] = true;
    }
    //check if the user has been authenticated
    //if so redirects him from where he came from
    //by default /dashboard
    if (this.state.authenticated) {
      return <Redirect to={from} />;
    }
    return (
      <div className="signinForm">
        <Jumbotron>
          <p className="lead">Accedi al tuo account</p>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" id="username" ref={this.username} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" id="password" ref={this.password} />
            </Form.Group>
            <Button
              className="btn btn-primary btn-md"
              onClick={() => this.login()}
            >
              Accedi
            </Button>
            <p className="authErrorLabel" id="authErrorLabel">
              {this.showError()}
            </p>
          </Form>
        </Jumbotron>
      </div>
    );
  };
}
