import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { register } from "../services/userService";
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  // async doSubmit() { //my wrong syntax
  doSubmit = async () => {
    //handle server errors
    try {
      //call the server
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      // this.props.history.push("/");
      window.location = "/";

      //console.log(response);
      //console.log("submitted");
    } catch (ex) {
      if (ex.response && ex.response.status === 400);

      const errors = { ...this.state.errors };
      errors.username = ex.response.data; //error message get from the server
      this.setState({ errors });
    }
  };

  render() {
    return (
      <div>
        <h1>Register Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "password", "password")}
          {this.renderInput("name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
