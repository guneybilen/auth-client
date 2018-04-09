
import axios from 'axios'

// browserHistory communicates information about the 
// URL to react-router. browserHistory can also be used
// for making changes for the URL as well.
import { browserHistory } from 'react-router';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090'


// Redux thunk middleware gives you direct access to the dispatch method.
// action creator -> action -> dispatch method sends the action to
// -> middlewares -> reducers

// Instead of returning an object, in redux-thunk, we return a function.

// In this action creator there will be branching,
// that is different from the ones of past projects.
export function signinUser({ email, password }) {

  // redux-thunk is giving us a direct access to the dispath()
  // function allowing us to dispath our action any time we want.
  // you can wait as long as you want to call dispatch() function.
  return function (dispatch) {

    //submit email/password to the server.
    // { email: email, password: password }
    // remember in the server the path is /signin for logging in.
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good ...
        //  - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        //  - Save the JWT token
        // localStroage lives in the browser and unique per domain. 
        // localStorage is not shared between, for instance, 
        // laptops and mobile devices. When the page
        // refreshed localStorage is not cleared.
        // no need import statement for localStorage.
        // 'local' is any name that you set for response.data.token
        // that is coming from the server.
        localStorage.setItem('token', response.data.token);
        //  _ redirect to the route '/feature', redirect once
        // the .post finishes - called programmatic navigation
        // as opposed to user clicking smthg.
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request fails ...
        //  - Show an error to the user
        dispatch(authError('Bad Login Info'))
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser(error) {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  };
}