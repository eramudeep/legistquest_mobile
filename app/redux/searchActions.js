export const SEARCH_QUERY = 'SEARCH_QUERY';
export const SET_SEARCH_QUERY_RESULTS = 'SET_SEARCH_QUERY_RESULTS';
export const RESET_SEARCH_QUERY_RESULTS = 'RESET_SEARCH_QUERY_RESULTS';
export const searchByQuery = (query) => ({
  type: SEARCH_QUERY,
  payload: query,
}); 

export const resetSearchResults = () => ({
  type: RESET_SEARCH_QUERY_RESULTS  
});
