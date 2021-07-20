import {combineReducers} from 'redux';
import error from './error';
import search from './search';
import filter from './filter';
export default combineReducers({
  error,
  search,
  filter,
});
