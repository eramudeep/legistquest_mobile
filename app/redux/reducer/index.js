import {combineReducers} from 'redux';
import error from './error';
import search from './search';
import filter from './filter';
import auth from './auth';
import scMat from './scMat';
export default combineReducers({
  error,
  search,
  filter,
  auth,
  scMat
});
