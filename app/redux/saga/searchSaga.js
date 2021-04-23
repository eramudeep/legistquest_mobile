import {put, takeLatest} from 'redux-saga/effects';
import { SEARCH_BY_KEY_WORDS } from '../../services/ApiList';
import {SEARCH_QUERY, SET_SEARCH_QUERY_RESULTS} from '../searchActions';

export function* workerSearchByQuery(action) {
  console.log('action', action.payload);
  const  QUERY =action.payload
  const{type,text}=QUERY
  console.log(`${SEARCH_BY_KEY_WORDS}type=${type}&searchString=${text}`);
 const results = yield fetch(`${SEARCH_BY_KEY_WORDS}type=${type}&searchString=${text}`)
  .then(response => response.text()) 
  //console.log("results",JSON.parse( results));
  try {
    if(results &&JSON.parse( results))
    { let size=8;
      if(JSON.parse( results).length < size){
        size=JSON.parse( results).length-1
      }
      yield put({type: SET_SEARCH_QUERY_RESULTS, payload: JSON.parse( results).slice(0, size) });
    }
  } catch (error) {
    console.log("error",error);
  }
 
}
export function* watcherSearchByQuery() {
  yield takeLatest(SEARCH_QUERY, workerSearchByQuery);
}
