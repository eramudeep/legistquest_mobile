const { SET_ERROR_SUCCESS, IS_LOADING } = require("../actionTypes");
const initialState = {
    hasError: {},
    isloading:false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERROR_SUCCESS:
            return {
                ...state,
                hasError: { ...action.payload },
            }
            case IS_LOADING:
                return{
                    ...state,
                    isloading:action.payload
                }
        default:
            return  state 
    }
}