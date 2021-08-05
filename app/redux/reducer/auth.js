const { USER_LOGIN_SUCCESS, USER_LOGOUT, } = require("../actionTypes");
const initialState = {
    userData:{}
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
        default:
            return  state
    }
}