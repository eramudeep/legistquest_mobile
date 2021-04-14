export const SEARCH_QUERY = 'SEARCH_QUERY';
export const SET_SEARCH_QUERY_RESULTS = 'SET_SEARCH_QUERY_RESULTS';
export const searchByQuery = (query) => ({
  type: SEARCH_QUERY,
  payload: query,
});
