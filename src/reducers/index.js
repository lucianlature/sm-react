import { combineReducers } from 'redux';
import {
  routerReducer
} from 'react-router-redux';
import transactions from './transactions';

/**
 * Routing to be implemented
 */
export default combineReducers({
  routing: routerReducer,
  transactions
});
