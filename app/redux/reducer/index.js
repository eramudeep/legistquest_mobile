import { combineReducers } from "redux"
import error from './error'
import search from './search'
export default combineReducers({
error,
search
})