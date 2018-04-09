import React, { Component } from 'react';
import * as actions from '../../actions';

// redux-form 7.something is either broken
// or the interface has changed
// console.log(email, password) 
// gives undefined undefined
import { reduxForm } from 'redux-form';

class Signin extends Component {

  handleFormSubmit({ email, password }) {
    // console.log(email, password);
    // Need to do smthg to log user in.
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group" >
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group" >
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// redux-form provides its own reducer. Don't forget to hook it up
// in the reducers folder and in the index.js file.
// reduxForm has two required arguments.
// form name is where redux form will place the property
// names in app state
// keep the field names consistent accross the app (server-client).
// reduxForm helper behaves exactly as the connect helper.
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
