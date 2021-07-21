
import { GET_PAGINATION, IS_LOADING, SET_ERROR} from "./actionTypes";

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
  /* here you can add your action */