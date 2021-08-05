
import { GET_PAGINATION, IS_LOADING, SET_ERROR, USER_LOGIN} from "./actionTypes";

export const setError=(data)=>({
    type:SET_ERROR,
    payload:data
  })
  export const setisLoading=(data)=>({
    type:IS_LOADING,
    payload:data
  })
  export const getPagination=(data)=>({
    type:GET_PAGINATION,
    payload:data
  })
  export const getUserLogin=(data)=>({
    type:USER_LOGIN,
    payload:data
  })
  export const getUserLogout=(data)=>({
    type:USER_LOGIN,
    payload:data
  })
  /* here you can add your action */