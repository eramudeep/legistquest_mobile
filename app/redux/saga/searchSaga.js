import {put, takeLatest} from 'redux-saga/effects';
import {CASE_TEXT_API_URL, SEARCH_BY_KEY_WORDS } from '../../services/ApiList';
import { AlertHelper } from '../../utils/AlertHelper';
import { getSearchType } from '../../utils/searchTypeHelper';
import { IS_LOADING } from '../actionTypes';
import {SET_RESULT_BY_TOPIC,GET_RESULT_BY_TOPIC, SEARCH_QUERY, SET_SEARCH_QUERY_RESULTS} from '../searchActions';


export function* workerSearchByQuery(action) {
   
  const  QUERY =action.payload
  const{type,text}=QUERY
  AlertHelper.show("success","search","search started")
 const results = yield fetch(`${SEARCH_BY_KEY_WORDS}type=${type}&searchString=${text}`)
  .then(response => response.text()) 
  // console.log("results",JSON.parse( results));
  try {
    AlertHelper.show("success","Got Result","search started")
    if(results &&JSON?.parse( results))
    { let size=8;
      if(JSON?.parse( results).length < size){
        size=JSON?.parse( results).length-1
      }
      yield put({type: SET_SEARCH_QUERY_RESULTS, payload: JSON?.parse( results)?.slice(0, size) });
    }
  } catch (error) {
    AlertHelper.show("error","Error","error while searching")
    console.log("error",error);
  }
 
}
export function* watcherSearchByQuery() {
  yield takeLatest(SEARCH_QUERY, workerSearchByQuery);
}




export function* workerGetResultsByTopic(action) {
  yield put({type: IS_LOADING, payload: true  });
  const searchType =yield getSearchType()
  const {selectedTopic}=action.payload 
  const results = yield fetch(`${CASE_TEXT_API_URL}type=${searchType}&caseText=${selectedTopic}&filter=&sortBy=1&formattedCitation=&removeFilter=&filterValueList=`)
  .then(response => response.text()) 

  try {
    if(results &&JSON.parse( results))
    {
      yield put({type: SET_RESULT_BY_TOPIC, payload: JSON.parse( results)  });
      yield put({type: IS_LOADING, payload: false  });
    }
  } catch (error) {
    yield put({type: IS_LOADING, payload: false  });
    console.log("error",error);
  }

 
}
export function* watcherGetResultsByTopic() {
  yield takeLatest(GET_RESULT_BY_TOPIC, workerGetResultsByTopic);
}






