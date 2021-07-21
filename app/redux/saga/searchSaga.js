import {put, takeLatest} from 'redux-saga/effects';
import {CASE_TEXT_API_URL, PAGINATION_API, SEARCH_BY_KEY_WORDS, SEARCH_RESULT_BY_PAGE_NUMBER } from '../../services/ApiList';
import { AlertHelper } from '../../utils/AlertHelper';
import { getSearchType } from '../../utils/searchTypeHelper';
import { GET_PAGINATION, IS_LOADING } from '../actionTypes';
import {SET_RESULT_BY_TOPIC,GET_RESULT_BY_TOPIC, SEARCH_QUERY, SET_SEARCH_QUERY_RESULTS} from '../searchActions';


export function* workerSearchByQuery(action) {
   
  const  QUERY =action.payload
  const{type,text}=QUERY
  //AlertHelper.show("success","search","search started")
 const results = yield fetch(`${SEARCH_BY_KEY_WORDS}type=${type ? type: "freetext"}&searchString=${text}`)
  .then(response => response.text()) 
  // console.log("results",JSON.parse( results));
  try {
    //AlertHelper.show("success","Got Result","search started")
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

export function* watcherSearchByPagination() {
  yield takeLatest(GET_PAGINATION, workerPageNumberChange);
}

export function* workerPageNumberChange(action) {
  const {pageNumber,sortBy,query,searchType,filterList,activeFilters } =
    action.payload;
  //console.log("action.payload", action.payload);
  const jsonData = {
    SearchText: query ? query : "",
    SearchType: searchType ? searchType : "freetext",
    BenchArray: "",
    Idrafarray: "",
    Yeararray: "",
    PageNo: pageNumber ? pageNumber : "",
    Partyarray: "",
    Decisionarray: "",
    SelectedFilter: "",
    Filter: "",
    SortBy: sortBy ? sortBy : "1",
    Courtarray: "",
    RemoveFilter: "",
    FilterValueList: filterList ? filterList.join(",") : "",
    ...activeFilters,
  };
  console.log("workerPageNumberChange", jsonData);
  var raw = JSON.stringify(jsonData);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const results = yield fetch(
    SEARCH_RESULT_BY_PAGE_NUMBER,
    requestOptions
  ).then(async (response) => response.text());
  try {
    console.log("result======",results);
    if (results && JSON.parse(results)) {
      yield put({
        type: SET_SEARCH_QUERY_RESULTS,
        payload: { ...JSON.parse(results),},
      });
    }
  } catch (error) {
    console.log("error in workerPageNumberChange", error);
  }
}