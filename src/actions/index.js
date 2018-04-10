
import axios from 'axios';

import $ from 'jquery';

// browserHistory communicates information about the 
// URL to react-router. browserHistory can also be used
// for making changes for the URL as well.
import { browserHistory } from 'react-router';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

const SIGNUP_URL = 'http://localhost:3090/signup';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}


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

export function signupUser({ email, password }) {

  return function (dispatch) {
    var ajaxRequest = $.ajax({
      url: SIGNUP_URL,
      method: 'POST',
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ email: email, password: password })
    })

    ajaxRequest.done(function (data) {
      // console.log(data);
      dispatch({ type: AUTH_USER });
      // console.log(data);
      localStorage.setItem('token', data.token);
      browserHistory.push('/feature');
    })

    ajaxRequest.fail(function (jqXHR, textStatus) {
      //console.log(jqXHR.responseJSON.error);
      //console.log(textStatus); // gives: error
      dispatch(authError(jqXHR.responseJSON.error))
    })

    // axios post does not return server response. They say online
    // it is regarding a problem about CORS. But, on the contrary
    // the problem is solved by using jQuery for 'POST' requests
    // instead of using axios.
    /*     axios.post(`${ROOT_URL}/signup`, { email, password })
          .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
          })
          .catch(response => {
            console.log(response);
            dispatch(authError(response.error))
          }); */
  }
}


export function signoutUser(error) {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  };
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        // console.log(response)
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}