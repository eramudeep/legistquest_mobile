import {put, takeLatest} from 'redux-saga/effects';
import {
  CASE_TEXT_API_URL,
  PAGINATION_API,
  SEARCH_BY_KEY_WORDS,
  SEARCH_BY_WORD,
  SEARCH_RESULT_BY_PAGE_NUMBER,
  SEARCH_RESULT_WITH_FILTERS_API,
} from '../../services/ApiList';
import {AlertHelper} from '../../utils/AlertHelper';
import { getHeaders } from '../../utils/common';
import {getSearchType} from '../../utils/searchTypeHelper';
import {GET_PAGINATION, IS_LOADING, SET_PAGE_NO} from '../actionTypes';
import { SEARCH_RESULT_WITH_FILTERS,CLEAN_FILTERS, SORT_BY_ONLY, sortByOnly } from '../filterActions';
import {
  SET_RESULT_BY_TOPIC,
  GET_RESULT_BY_TOPIC,
  SEARCH_QUERY,
  SET_SEARCH_QUERY_RESULTS,
} from '../searchActions';

export function* workerSearchByQuery(action) {
  const QUERY = action.payload;
  const {type, text} = QUERY;
  
   const URL =   `${SEARCH_BY_WORD}type=${
      type ? type : 'freetext'
    }&searchString=${text}`
  const results = yield fetch(URL  ,
  ).then((response) => response.text());
  //console.log({URL});
  // console.log("results",JSON.parse( results));
  try {
    //AlertHelper.show("success","Got Result","search started")
    if (results && JSON?.parse(results)) {
      let size = 20;
      if (JSON?.parse(results).length < size) {
        size = JSON?.parse(results).length - 1;
      }
      yield put({
        type: SET_SEARCH_QUERY_RESULTS,
        payload: JSON?.parse(results)?.slice(0, size),
      });
    }
  } catch (error) {
    AlertHelper.show('error', 'Error', 'error while searching');
    console.log('error', error);
  }
 return true
}
export function* watcherSearchByQuery() {
  yield takeLatest(SEARCH_QUERY, workerSearchByQuery);
}

export function* workerGetResultsByTopic(action) {
  
  
  const searchType = yield getSearchType();
  const {selectedTopic,filterValueList,SortBy,keepFilters} = action.payload; 
  //console.log({filterValueList});
  yield put({type: IS_LOADING, payload: true});
  yield put({type: SET_PAGE_NO, payload: 1});
  if(!keepFilters)
  yield put({type: CLEAN_FILTERS}); 
  let URL = `${CASE_TEXT_API_URL}type=${searchType}&caseText=${selectedTopic}&sortBy=${SortBy ? SortBy : 1}&formattedCitation=&removeFilter=`
  console.log("URL",URL);
   if(  filterValueList?.length >0){
    if(filterValueList?.length <2)
      URL=`${URL}&filter=${filterValueList ? filterValueList[filterValueList?.length-1] :''}`
    else
      URL=`${URL}&filterValueList=${filterValueList ? filterValueList?.toString():''}` 
  }  
  const results = yield fetch(
    URL,
  ).then((response) => response.text());
 
  try {
    if (results && JSON.parse(results)) {
      yield put({type: SET_RESULT_BY_TOPIC, payload: JSON.parse(results)});
      yield put({type: IS_LOADING, payload: false});
    }
  } catch (error) {
    yield put({type: IS_LOADING, payload: false});
    console.log('error', error);
  }
}
export function* watcherGetResultsByTopic() {
  yield takeLatest(GET_RESULT_BY_TOPIC, workerGetResultsByTopic);
}

export function* watcherSearchByPagination() {
  yield takeLatest(GET_PAGINATION, workerPageNumberChange);
}

export function* workerPageNumberChange(action) {

  const {pageNumber, filtersList, callback} = action.payload;
    
  const jsonData = { 
    PageNo: pageNumber ? pageNumber : '',  
    ...filtersList
  };  
  var requestOptions = getHeaders(jsonData) 
  const results = yield fetch(
    SEARCH_RESULT_BY_PAGE_NUMBER,
    requestOptions,
  ).then(async (response) => response.text());
console.log({jsonData});
  try {
    if (results && JSON.parse(results)) { 
        yield put({type: SET_RESULT_BY_TOPIC, payload: {...JSON.parse( results),fromPagination: true }  });
      yield put({type: IS_LOADING, payload: false  });  
      
      yield callback(true)
    }
  } catch (error) {
    console.log('error in workerSearchWithFilters', error);
  }
}
export function* workerSearchWithFilters(action) {
  const activeFilters = action.payload;   
  const requestOptions =  getHeaders({...activeFilters}) 
  console.log( activeFilters );
  yield put({type: IS_LOADING, payload: true});
  yield put({type: SET_PAGE_NO, payload: 1});
  console.log({SEARCH_RESULT_WITH_FILTERS_API });
  const results = yield fetch(
    SEARCH_RESULT_WITH_FILTERS_API,
    requestOptions,
  ).then(async (response) => response.text());
  //console.log({results});
   
  try {
    if (results && JSON.parse(results)) {
      
      yield put({ 
        type: SET_RESULT_BY_TOPIC,
        payload: {...JSON.parse(results)},
      });
      yield put({type: IS_LOADING, payload: false});
    }
  } catch (error) { 
    console.log('error in workerSearchWithFilters', error);
  }
} 
export function* watcherSearchWithFilters() {
  yield takeLatest(SEARCH_RESULT_WITH_FILTERS, workerSearchWithFilters);
}
/* 
export function* workerGetResultsBySort(action) {
  yield put({type: IS_LOADING, payload: true}); 
  
  const {searchType,searchText,sortBy} = action.payload;
  const results = yield fetch(
    `${CASE_TEXT_API_URL}type=${searchType}&caseText=${searchText}&filter=&sortBy=${sortBy}&formattedCitation=&removeFilter=&filterValueList=`,
  ).then((response) => response.text());

  try {
    if (results && JSON.parse(results)) {
      yield put({type: SET_SEARCH_QUERY_RESULTS, payload: JSON.parse(results)});
      yield put({type: IS_LOADING, payload: false});
    }
  } catch (error) {
    yield put({type: IS_LOADING, payload: false});
    console.log('error', error);
  }
}
export function* watcherGetResultsBySort() {
  yield takeLatest(SORT_BY_ONLY, workerGetResultsBySort);
} */