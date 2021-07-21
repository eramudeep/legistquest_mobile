const {TOGGLE_FILTER} = require('../filterActions');
const initialState = {
  filters: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}
