import {
  SET_SEARCH_QUERY_RESULTS,
  RESET_SEARCH_QUERY_RESULTS,
} from '../searchActions';

const initialState = {
  searchResults: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case RESET_SEARCH_QUERY_RESULTS:
      return {
        ...state,
        searchResults: [],
      };

    default:
      return {...state};
  }
}
