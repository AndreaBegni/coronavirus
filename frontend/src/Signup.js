import React, { Component } from "react";
import { Jumbotron, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registered: false,
      authError: false,
      accessClicked: false
    };

    this.username = React.createRef();
    this.password = React.createRef();
  }

  register = async () => {
    let url = "http://localhost:4000/users";
    let postData = {
      username: this.username.current.value,
      password: this.password.current.value
    };
    const HTTPPost = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(postData),
      method: "POST"
    };
    let isRegistered = false;
    let data = await fetch(url, HTTPPost).then(response => response.json());
    if (data.success === "user registered") {
      isRegistered = true;
    } else if (data.error === "user alredy exists") {
      isRegistered = false;
    }
    this.setState({
      registered: isRegistered,
      authError: !isRegistered
    });
  };

  showError = () => {
    if (this.state.authError) return "*Username già esistente";
  };

  accessButton = () => {
    this.setState({
      accessClicked: true
    });
  };

  render = () => {
    if (this.state.registered) {
      return <Redirect to={"/signin"} />;
    }
    if (this.state.accessClicked) {
      return <Redirect to={"/signin"} />;
    }
    return (
      <div className="signupForm">
        <Jumbotron>
          <p className="lead">Sei un nuovo utente? Registrati!</p>
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
              onClick={() => this.register()}
            >
              Registrati
            </Button>
            <p className="authErrorLabel" id="authErrorLabel">
              {this.showError()}
            </p>
          </Form>
          <p>Hai già un account?</p>
          <p>
            <p onClick={() => this.accessButton()}>Accedi</p>
          </p>
        </Jumbotron>
      </div>
    );
  };
}
