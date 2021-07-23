import {senitizeAnyArray} from '../../utils/common';

const {
  TOGGLE_FILTER,
  ADD_REMOVE_BY_BENCH_FILTER,
  ADD_REMOVE_BY_YEAR_FILTER,
  ADD_REMOVE_BY_DECISION_FILTER,
  CLEAN_FILTERS,
  SORT_BY_ONLY,
  TOGGLE_FILTER_WITH_IN_RESULT,
} = require('../filterActions');
const initialState = {
  filters: [],
  selectedByBench: [], // use as a comma seprated string
  selectedByYear: [], // use as a comma seprated string
  selectedByDecStatus: [], // use as a comma seprated string
  sortBy:1,
  filterWithInResult: [], // use as a comma seprated string
};
export default function (state = initialState, action) {
  switch (action.type) {
    
    case CLEAN_FILTERS: 
       
      return {
        ...state,
        selectedByBench: [], 
        selectedByYear: [], 
        selectedByDecStatus: [],
        sortBy:1,
        selectedByBench: [],
        selectedByYear: [],
        selectedByDecStatus: [],
        filters: [],
        filterWithInResult: action?.payload?.keepWithInResultFilter ? state.filterWithInResult : [],
      };

    case TOGGLE_FILTER_WITH_IN_RESULT:
      //console.log("filterWithInResult",action.payload);
      const filterWithInResult = senitizeAnyArray(
        action.payload,
        state.filterWithInResult,
      );
      console.log(">>>>",filterWithInResult);
      return {
        ...state,
        filterWithInResult:filterWithInResult,
      };
      

    case ADD_REMOVE_BY_DECISION_FILTER:
      const selectedByDecStatus = senitizeAnyArray(
        action.payload,
        state.selectedByDecStatus,
        true,
      );
      return {
        ...state,
        selectedByDecStatus,
      };

    case ADD_REMOVE_BY_YEAR_FILTER:
      const selectedByYear = senitizeAnyArray(
        action.payload,
        state.selectedByYear,
        true,
      );
      return {
        ...state,
        selectedByYear,
      };

    case ADD_REMOVE_BY_BENCH_FILTER:
      const selectedByBench = senitizeAnyArray(
        action.payload,
        state.selectedByBench,
        true,
      );
      return {
        ...state,
        selectedByBench,
      };
    case TOGGLE_FILTER:
      let tmpFilters = state.filters;
      if (tmpFilters?.includes(action.payload)) {
        //remove
        const index = tmpFilters.indexOf(action.payload);
        if (index > -1) {
          tmpFilters.splice(index, 1);
        }
        tmpFilters = [...tmpFilters];
      } else {
        tmpFilters = [...tmpFilters, action.payload];
      }

      return {
        ...state,
        filters: tmpFilters,
      };
      case SORT_BY_ONLY:
        console.log("actttss",action.payload.sortBy);
        return {
          ...state,
          sortBy:action.payload.sortBy,
        };
    default:
      return state;
  }
}
