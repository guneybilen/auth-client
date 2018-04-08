import { combineReducers } from 'redux';

// reducer import named due to prevent confusion.
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  // below is a dummy reducer
  // state: (state = {}) => state

  // form is combineReducers object key and the other form is
  // coming from redux-form.
  // form: form  - since we are in {} form: form can be shortened to:
  form
});

export default rootReducer;
