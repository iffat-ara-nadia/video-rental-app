import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
//Input from "../components/common/input"; wrong syntax
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    //As a rule of thumb, initialize properties with empty string or some values from the server.
    data: { username: "", password: "" },
    errors: {} //my error: i wrote error: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      //Call the server
      const { data } = this.state;
      await auth.login(data.username, data.password);

      //Redirect to homepage or previous page
      const { state } = this.props.location; //if location has a property "state"
      window.location = state ? state.from.pathname : "/"; //this 'from' is location object, and location objects in React router have a property called "pathname"
      //this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        {/* Every Form element has an event called onSubmit={} */}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
