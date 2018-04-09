import React, { Component } from 'react'
import { reduxForm } from "redux-form";
import * as actions from '../../actions'

// if the user clicked in and clicked out and that field has an error
// coming from the validate function below then return the div with 
// the class name error - a trick in js - The line below is coded in the form.
// { password.touched && password.error && <div className="error">{password.error}</div> }

class Signup extends Component {

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;

    return (
      <form>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} ></input>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} type="password"></input>
          {password.touched && password.error && <div className="error" >{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input className="form-control" {...passwordConfirm} type="password"></input>
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    )
  }
}

function validate(formProps) {
  const errors = {}

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate: validate
})(Signup);
