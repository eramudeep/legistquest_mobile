const { USER_LOGIN_SUCCESS, USER_LOGOUT, IS_NIGHTMODE, } = require("../actionTypes");
const initialState = {
    userData:{},
    isNightmode:false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            console.log("user logggeedd==",action);
            return {
                ...state,
                userData: { ...action.payload },
            }
            case USER_LOGOUT:
                return{
                    ...state,
                    userData:{}
                }
                case IS_NIGHTMODE:
                    return{
                        ...state,
                        isNightmode:action.payload
                    }
        default:
            return  state
    }
}