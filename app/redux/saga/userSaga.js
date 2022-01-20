import { put, takeLatest } from 'redux-saga/effects'
import { LOGIN_API, LOGIN_CORP_API, LOGOUT_API } from '../../services/ApiList';
import { AlertHelper } from '../../utils/AlertHelper';
import {  SET_ERROR, USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../actionTypes';
export function* workerUserLogin(action) {
    let userData={}
  if (action) {
      const{email,password,customerCode,callback}=action.payload 
      let BodyData={}
      if(customerCode)BodyData={email,password,customerCode}
      else BodyData={email,password}
      console.log("body Data is",BodyData);
    //   return
//    
   yield fetch(customerCode ? LOGIN_CORP_API: LOGIN_API, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(BodyData)
      })
      .then((response) => response.json())
      .then(async(json) => {
        console.log("user login ",json);
        
     if(json.statusCode==200){
        callback && callback({status:true})
        userData=json
     }
     else callback && callback({status:false})
        
      })
      .catch((error) => {
        callback && callback({status:false})
        console.log("Login error ",error);
      });
     yield put({type:USER_LOGIN_SUCCESS,payload:userData})
  }
}
export function* watcherUserLogin() {
  yield takeLatest(USER_LOGIN,workerUserLogin)
}
export function* workerUserLogout(action) {
  if (action) {
    const{usertoken,callback}=action.payload 
    console.log("body Data is",usertoken);
  //   return
 const respo=yield fetch(LOGOUT_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({usertoken})
    })
    .then((response) => response.json())
    .then(async(json) => {
      console.log("user logout ",json);
      
      callback && callback({status:true})
      return true
    })
    .catch((error) => {
      callback && callback({status:false})
      console.log("Logout error ",error);
      return false
    });
   if(respo){
    yield put({type:USER_LOGOUT_SUCCESS,})
   }
  }
}
export function* watcherUserLogout() {
  yield takeLatest(USER_LOGOUT,workerUserLogout)
}