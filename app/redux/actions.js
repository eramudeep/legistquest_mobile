
import { GET_PAGE_NO, GET_PAGINATION, IS_LOADING, IS_NIGHTMODE, SET_ERROR, SET_PAGE_NO, USER_LOGIN} from "./actionTypes";

export const setError=(data)=>({
    type:SET_ERROR,
    payload:data
  })
  export const setisLoading=(data)=>({
    type:IS_LOADING,
    payload:data
  })
  export const getPageNo=(data)=>({
    type:GET_PAGE_NO,
    payload:data
  })
  export const setPageNo=(data)=>({
    type:SET_PAGE_NO,
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
  export const setIsNightMode=(data)=>({
    type:IS_NIGHTMODE,
    payload:data
  })
  /* here you can add your action */