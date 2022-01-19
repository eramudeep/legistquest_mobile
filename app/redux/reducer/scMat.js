const {TOGGLE_SC_MATERTIAL} = require('../scMatAction');
const initialState = {
  scMatActive: 0,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SC_MATERTIAL:
      return {
        ...state,
        scMatActive: action.payload,
      };
    default:
      return state;
  }
}
