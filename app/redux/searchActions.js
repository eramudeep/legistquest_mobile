export const SEARCH_QUERY = 'SEARCH_QUERY';
export const SET_SEARCH_QUERY_RESULTS = 'SET_SEARCH_QUERY_RESULTS';
export const RESET_SEARCH_QUERY_RESULTS = 'RESET_SEARCH_QUERY_RESULTS';
export const  GET_RESULT_BY_TOPIC= 'GET_RESULT_BY_TOPIC';
export const  SET_RESULT_BY_TOPIC= 'SET_RESULT_BY_TOPIC';

export const searchByQuery = (query) => ({
  type: SEARCH_QUERY,
  payload: query,
}); 

export const resetSearchResults = () => ({
  type: RESET_SEARCH_QUERY_RESULTS  
});


export const getResultsByTopic = (payload) => ({
  type: GET_RESULT_BY_TOPIC  ,
  payload:payload,
});
