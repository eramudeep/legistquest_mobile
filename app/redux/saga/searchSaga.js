import {put, takeLatest} from 'redux-saga/effects';
import {CASE_TEXT_API_URL, SEARCH_BY_KEY_WORDS } from '../../services/ApiList';
import { getSearchType } from '../../utils/searchTypeHelper';
import {SET_RESULT_BY_TOPIC,GET_RESULT_BY_TOPIC, SEARCH_QUERY, SET_SEARCH_QUERY_RESULTS} from '../searchActions';

export function* workerSearchByQuery(action) {
   
  const  QUERY =action.payload
  const{type,text}=QUERY
  //console.log(`${SEARCH_BY_KEY_WORDS}type=${type}&searchString=${text}`);
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




export function* workerGetResultsByTopic(action) {
  const searchType =yield getSearchType()
  const {selectedTopic}=action.payload
  //console.log('searchType', searchType,"selectedTopic",selectedTopic);
  //caseText=mamta&type=freetext&filter=&sortBy=1&formattedCitation=&removeFilter=&filterValueList="
  
  const results = yield fetch(`${CASE_TEXT_API_URL}type=${searchType}&caseText=${selectedTopic}&filter=&sortBy=1&formattedCitation=&removeFilter=&filterValueList=`)
  .then(response => response.text()) 

  try {
    if(results &&JSON.parse( results))
    {  
       
      yield put({type: SET_RESULT_BY_TOPIC, payload: JSON.parse( results)  });
    }
  } catch (error) {
    console.log("error",error);
  }

 
}
export function* watcherGetResultsByTopic() {
  yield takeLatest(GET_RESULT_BY_TOPIC, workerGetResultsByTopic);
}






