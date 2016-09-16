/**
 * Created by Lucian on 16/09/2016.
 */

import { combineReducers } from 'redux';
const initialState = {
  host: '',
  protocol: ''
};

const sourceRequest = (state = initialState, action) => state;

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
  return combineReducers({
    sourceRequest,
    ...asyncReducers
  })
}
