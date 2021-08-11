const { SET_ERROR_SUCCESS, IS_LOADING, SET_PAGE_NO } = require("../actionTypes");
const initialState = {
    hasError: {},
    isloading: false,
    pageNumber: 1
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERROR_SUCCESS:
            return {
                ...state,
                hasError: { ...action.payload },
            }
        case IS_LOADING:
            return {
                ...state,
                isloading: action.payload
            }
        case SET_PAGE_NO:
            return {
                ...state,
                pageNumber: action.payload
            }
        default:
            return state
    }
}