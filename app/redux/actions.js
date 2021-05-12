
import { IS_LOADING, SET_ERROR} from "./actionTypes";

export const setError=(data)=>({
    type:SET_ERROR,
    payload:data
  })
  export const setisLoading=(data)=>({
    type:IS_LOADING,
    payload:data
  })
  /* here you can add your action */