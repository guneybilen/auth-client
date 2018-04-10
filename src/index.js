import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';

// DO NOT FORGET: {this.props.children} in app.js
// since signin is a child of App.
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from "./actions/types";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// create the store earlier than the token check,
// in order to be able to make a token check.
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
// If we have token, consider the user to be signed in.
if (token) {
  // we need to update the application state.
  // the dispatch we have been using in the 
  // action creators is a property of the store.
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  // Provider is what communicates with our connected components.
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
