// you can add your action type here
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export const toggleFilters = (filters) => ({
  type: TOGGLE_FILTER,
  payload: filters,
});
