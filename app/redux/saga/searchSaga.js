import {put, takeLatest} from 'redux-saga/effects';
import { SEARCH_BY_KEY_WORDS } from '../../services/ApiList';
import {SEARCH_QUERY, SET_SEARCH_QUERY_RESULTS} from '../searchActions';

export function* workerSearchByQuery(action) {
  console.log('action', action.payload);
  const  QUERY =action.payload
  
 const results = yield fetch(`${SEARCH_BY_KEY_WORDS}${QUERY}`)
  .then(response => response.text()) 
  //console.log("results",JSON.parse( results));
  try {
    if(JSON.parse( results))
    yield put({type: SET_SEARCH_QUERY_RESULTS, payload: JSON.parse( results)});
  } catch (error) {
    console.log("error",error);
  }
 
}
export function* watcherSearchByQuery() {
  yield takeLatest(SEARCH_QUERY, workerSearchByQuery);
}
