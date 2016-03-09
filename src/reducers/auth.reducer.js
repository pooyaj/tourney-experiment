import {CONST} from '../constants'
import * as ActionTypes from '../actions/actionTypes'

export default function authReducer(
  state = {
    authState: CONST.AUTH_ANONYMOUS,
    username: null, 
    uid: null, 
    provider: null
  }, action) {
  switch (action.type) {
    case ActionTypes.AUTH_IN_PROGRESS:
      return Object.assign({}, state, {authState: CONST.AUTH_WAITING});
    case ActionTypes.AUTH_LOGIN:
      return action.data;
    case ActionTypes.AUTH_LOGOUT:
      return state;
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state, {authState: CONST.AUTH_ERROR});;      
  }  
  return state;
}