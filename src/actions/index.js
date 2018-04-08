
import axios from 'axios'

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

    // If request is good ...
    //  - Update state to indicate user is authenticated
    //  - Save the JWT token
    //  _ redirect to the route '/feature'

    // If request is bad ...
    //  - Show an error to the user


  }

}