// you can add your action type here
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const ADD_REMOVE_BY_BENCH_FILTER = 'ADD_REMOVE_BY_BENCH_FILTER';
export const ADD_REMOVE_BY_YEAR_FILTER = 'ADD_REMOVE_BY_YEAR_FILTER';
export const ADD_REMOVE_BY_DECISION_FILTER = 'ADD_REMOVE_BY_DECISION_FILTER';
export const ADD_REMOVE_BY_DECISION_LABEL_FILTER = 'ADD_REMOVE_BY_DECISION_LABEL_FILTER';
export const ADD_REMOVE_BY_COURT_FILTER = 'ADD_REMOVE_BY_COURT_FILTER';

export const ADD_REMOVE_BY_IDRAF = 'ADD_REMOVE_BY_IDRAF';
export const SEARCH_RESULT_WITH_FILTERS = 'SEARCH_RESULT_WITH_FILTERS';
export const SORT_BY_ONLY="SORT_BY_ONLY";
export const CLEAN_FILTERS = 'CLEAN_FILTERS';
export const TOGGLE_FILTER_WITH_IN_RESULT = 'TOGGLE_FILTER_WITH_IN_RESULT';

 
export const toggleFilters = (filters) => ({
  type: TOGGLE_FILTER,
  payload: filters,
});

export const toggleByBench = (benchValue) => ({
  type: ADD_REMOVE_BY_BENCH_FILTER,
  payload: benchValue,
});

export const toggleByCourt = (courtValue) => ({

  type: ADD_REMOVE_BY_COURT_FILTER,
  payload: courtValue,
});

export const toggleByIdraf = (idrafValue) => ({
  type: ADD_REMOVE_BY_IDRAF,
  payload: idrafValue,
});

export const toggleByYear = (yearValue) => ({
  type: ADD_REMOVE_BY_YEAR_FILTER,
  payload: yearValue,
});

export const toggleByDecsion = (decsionValue) => ({
  type: ADD_REMOVE_BY_DECISION_FILTER,
  payload: decsionValue,
});
export const toggleByDecsionLabel = (decsionLabel) => ({
  type: ADD_REMOVE_BY_DECISION_LABEL_FILTER,
  payload: decsionLabel,
});


export const searchByFilters = (filters) => ({
  type: SEARCH_RESULT_WITH_FILTERS,
  payload: filters,
});
export const sortByOnly = (filters) => ({
  type: SORT_BY_ONLY,
  payload: filters,
});
export const toggleFiltersWithInResult = (filter) => ({
  type: TOGGLE_FILTER_WITH_IN_RESULT,
  payload: filter,
});


export const resetFilters = (option) => ({
  type: CLEAN_FILTERS,
  payload: option,
});

