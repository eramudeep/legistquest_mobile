import {
  SET_SEARCH_QUERY_RESULTS,
  RESET_SEARCH_QUERY_RESULTS,
  SET_RESULT_BY_TOPIC,
  SEARCH_QUERY,
} from '../searchActions';

const initialState = {
  searchResults: [],
  searchTopicResult: [],
  searchQuery: {type:"freetext", text:""},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case SET_SEARCH_QUERY_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case SET_RESULT_BY_TOPIC:
      const {fromPagination} = action.payload;
      let results = action.payload;
      if (fromPagination) {
        let tmp = state.searchTopicResult;
        tmp.CaseDetails = [
          ...state.searchTopicResult.CaseDetails,
          ...action.payload.CaseDetails,
        ];
        results = tmp;
      }

      return {
        ...state,
        searchTopicResult: results,
      };

    case RESET_SEARCH_QUERY_RESULTS:
      return {
        ...state,
        searchResults: [],
      };

    default:
      return state;
  }
}
