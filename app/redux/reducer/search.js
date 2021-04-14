import { SET_SEARCH_QUERY_RESULTS } from "../searchActions";
 

const initialState = {
    searchResults:[],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_QUERY_RESULTS:
            return {
                ...state,
                searchResults:  action.payload ,
            }
        default:
            return { ...state }
    }
}