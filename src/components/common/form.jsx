import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options); //1st argument's the object we want to validate.

    if (!error) return null;

    // get the array & map it into an object
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    //if error is defined, return message otherwise null.
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    //input.name will set the errorMessage of username/ password property of errors object
    else delete errors[input.name];

    const data = { ...this.state.data };
    // data[e.input] = input.value; MY WRONG SYNTAX
    // data[input] = input.value; my Wrong syntax

    //input.name identifies the name of the target property & set the target
    //property ofdataobject.
    //To set the property(input.name) ofdataobject Dynamically, use bracket notation
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault(); //This event object's preventDefault() prevents the default behaviour of
    //this event.In this case,submitting the form to the server which causes
    //full page reload.

    const errors = this.validate();
    this.setState({ errors: errors || {} }); //errors property should
    //always be set to an object.It should never be null.

    if (errors) return;

    this.doSubmit(); // this method will vary from one Form to another.
  };

  renderButton(label) {
    return (
      // Missed return keyword
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name} //I wrote: {username} instead of "username"
        value={data[name]}
        label={label}
        onChange={this.handleChange} //wrote: onchange
        error={errors[name]}
      />
    );
  }
}

export default Form;
