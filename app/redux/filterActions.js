// you can add your action type here
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const ADD_REMOVE_BY_BENCH_FILTER = 'ADD_REMOVE_BY_BENCH_FILTER';
export const ADD_REMOVE_BY_YEAR_FILTER = 'ADD_REMOVE_BY_YEAR_FILTER';
export const ADD_REMOVE_BY_DECISION_FILTER = 'ADD_REMOVE_BY_DECISION_FILTER';
export const SEARCH_RESULT_WITH_FILTERS = 'SEARCH_RESULT_WITH_FILTERS';
export const CLEAN_FILTERS = 'CLEAN_FILTERS';
export const toggleFilters = (filters) => ({
  type: TOGGLE_FILTER,
  payload: filters,
});

export const toggleByBench = (benchValue) => ({
  type: ADD_REMOVE_BY_BENCH_FILTER,
  payload: benchValue,
});

export const toggleByYear = (yearValue) => ({
  type: ADD_REMOVE_BY_YEAR_FILTER,
  payload: yearValue,
});

export const toggleByDecsion = (decsionValue) => ({
  type: ADD_REMOVE_BY_DECISION_FILTER,
  payload: decsionValue,
});

export const searchByFilters = (filters) => ({
  type: SEARCH_RESULT_WITH_FILTERS,
  payload: filters,
});
