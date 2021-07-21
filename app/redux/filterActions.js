// you can add your action type here
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const ADD_REMOVE_BY_BENCH_FILTER = 'ADD_REMOVE_BY_BENCH_FILTER';
export const ADD_REMOVE_BY_YEAR_FILTER = 'ADD_REMOVE_BY_YEAR_FILTER';
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
